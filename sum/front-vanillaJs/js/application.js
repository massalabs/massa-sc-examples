import ContractInteraction from "./contractInteraction.js";

export default class Application {
  constructor(provider) {
    this.provider = provider;
    this.errorMessage = "";
  }

  async init() {
    document
      .getElementById("connectButton")
      .addEventListener("click", async () => {
        try {
          await this.provider.connect();
          document.getElementById("connection").style.display = "none";
          document.getElementById("walletInfo").style.display = "block";
          document.getElementById("contractInteraction").style.display =
            "block";
          document.getElementById("address").innerText =
            this.provider.wallet.address;
          document.getElementById("balance").innerText =
            this.provider.wallet.balance;
          this.intiContractInteraction();
        } catch (err) {
          document.getElementById("error").style.display = "block";
          document.getElementById("errorMessage").innerText = err.message;
        }
      });
  }

  intiContractInteraction() {
    new ContractInteraction(this.provider.client, "contractAddress");
  }
}
