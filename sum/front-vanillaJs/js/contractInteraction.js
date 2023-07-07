const { Args, ON_MASSA_EVENT_DATA, ON_MASSA_EVENT_ERROR, EventPoller } =
  window.massa;
const DEFAULT_TARGET_ADDRESS =
  "AS12YrZxFisWZCKJpXLEYfSYzrSCS4bjoyKGeaviQMmb5zqfgXaML";
const POLLING_INTERVAL = 1000;

export default class ContractInteraction {
  client;
  contract;

  constructor(client, contract) {
    this.client = client;
    this.contract = contract;
    this.render();
    this.addEventListener();
  }

  /**
   * Get the value from the smart contract
   */
  async getValue() {
    try {
      const result = await this.client.smartContracts().readSmartContract({
        fee: 1000n,
        maxGas: 10000000n,
        coins: 100n,
        targetAddress: DEFAULT_TARGET_ADDRESS,
        targetFunction: "lastResult",
        parameter: [],
      });

      return new Args(result.returnValue).nextI64();
    } catch (error) {
      throw new Error(`Error getting value: ${error.message}`);
    }
  }

  /**
   * Perform addition operation via smart contract
   * @param {BigInt} a - first number
   * @param {BigInt} b - second number
   */
  async add(a, b) {
    const args = new Args().addI64(a).addI64(b);
    try {
      const opId = await this.client.smartContracts().callSmartContract({
        fee: 1000n,
        maxGas: 10000000n,
        coins: 5000000n,
        targetAddress: DEFAULT_TARGET_ADDRESS,
        functionName: "sum",
        parameter: args.serialized,
      });

      return await this.pollForResult(a, b);
    } catch (error) {
      throw new Error(`Error adding numbers: ${error.message}`);
    }
  }

  /**
   * Polls for results from the smart contract
   * @param {BigInt} a - first number
   * @param {BigInt} b - second number
   * @param {Object} eventsFilter - event filter criteria
   */
  async pollForResult(a, b) {
    const nodeStatus = await this.client.publicApi().getNodeStatus();

    const eventsFilter = {
      start: nodeStatus.last_slot,
      end: null,
      original_caller_address: null,
      original_operation_id: null,
      emitter_address: null,
    };

    const eventPoller = window.massa.EventPoller.startEventsPolling(
      eventsFilter,
      POLLING_INTERVAL,
      this.client
    );

    try {
      const result = await new Promise((resolve, reject) => {
        eventPoller.on(ON_MASSA_EVENT_DATA, (res) =>
          res.forEach((event) => {
            if (event.data.includes(`Sum (${a}, ${b})`)) {
              this.getValue().then(resolve);
            }
          })
        );

        eventPoller.on(ON_MASSA_EVENT_ERROR, reject);
      });

      return result;
    } catch (error) {
      throw new Error(`Error polling for result: ${error.message}`);
    } finally {
      eventPoller.stopPolling();
    }
  }

  /**
   * Add event listener to button click
   */
  addEventListener() {
    document.getElementById("addButton").addEventListener("click", async () => {
      try {
        const num1 = BigInt(document.getElementById("num1").value);
        const num2 = BigInt(document.getElementById("num2").value);
        document.getElementById("result").innerText = "Fetching...";
        const result = await this.add(num1, num2);
        document.getElementById("result").innerText = result;
      } catch (err) {
        document.getElementById("error").style.display = "block";
        document.getElementById("errorMessage").innerText = err.message;
      }
    });
  }

  /**
   * Renders UI components
   */
  render() {
    const componentInteraction = document.getElementById("contractInteraction");
    componentInteraction.innerHTML = `
      <h2 id="titleAddition">Addition</h2>
      <input id="num1" type="number" min="0" placeholder="First number" />
      <input id="num2" type="number" min="0" placeholder="Second number" />
      <button id="addButton">Add Numbers</button>
      <p>Result: <span id="result"></span></p>
    `;
  }
}
