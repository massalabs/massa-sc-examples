let massa = window.massa;

let client = null;
let account = null;
let Args = massa.Args;

const sc_addr = "AS1284LtJxDNyYTMLioPtbnsF3h3xAXMFnDF1kBrKBjN4WDSdbzsw";

// initialize a testnet client
const initializeClient = async () => {
  try {
    let provider = (await massa.providers(true, 10000))[0];
    let accounts = await provider.accounts();
    if (accounts.length === 0) {
      console.log("no accounts found");
      return;
    }
    account = accounts[0];
    if (!account || !provider) {
      return;
    }
    client = await massa.ClientFactory.fromWalletProvider(provider, account);
  } catch (e) {
    console.log(e);
  }
};

const callGetAge = async () => {
    try {
      if (!account || !client) {
        return;
      }
      console.log("calling getAge");
      let res = await client.smartContracts().readSmartContract({
        maxGas: BigInt(1000000),
        targetAddress: CONTRACT_ADDRESS,
        targetFunction: "getAge",
        parameter: new Args().addString(inputName).serialize(),
      });

      setAgeResult(bytesToU32(res.returnValue));
    } catch (error) {
      console.error(error);
    }
  }

function funcSetAge(number) {
  let args = new Args();
  args.addString("alice");
  args.addU32(
    BigInt(document.getElementById("age").innerHTML) + BigInt(number)
  );
  if (client) {
    client
      .smartContracts()
      .callSmartContract({
        fee: 0,
        maxGas: 1000000,
        coins: 0,
        targetAddress: sc_addr,
        functionName: "change_age",
        parameter: args.serialize(),
      })
      .then((res) => {
        console.log(res);
      });
  }
}

function initialize() {
  let args = new Args();
  if (client) {
    client
      .smartContracts()
      .callSmartContract({
        fee: 0,
        maxGas: 1000000,
        coins: 10_000_000_000,
        targetAddress: sc_addr,
        functionName: "initialize",
        parameter: args.serialize(),
      })
      .then((res) => {
        console.log(res);
      });
  }
}
