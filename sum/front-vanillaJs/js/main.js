import Wallet from "./wallet.js";
import Provider from "./provider.js";
import Application from "./application.js";

let application = new Application(new Provider(new Wallet()));

window.onload = async () => {
  await application.init();
};
