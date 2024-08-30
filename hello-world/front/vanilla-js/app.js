import { getWallets } from "@massalabs/wallet-provider";
import { Args, bytesToStr, OperationStatus } from "@massalabs/massa-web3";

const CONTRACT_ADDRESS =
  "AS12mFfp7XA8U5QyRPBWNT5V5BLeEMxuoxHft5Ph8y9uGH2SecDXw";

let provider;

function showError(message) {
  const errorElement = document.getElementById("errorMessage");
  errorElement.textContent = message;
  errorElement.classList.add("visible");
  setTimeout(() => {
    errorElement.classList.remove("visible");
  }, 3000);
}

async function initProvider() {
  try {
    const walletList = await getWallets();
    const wallet = walletList.find(
      (provider) => provider.name() === "MASSASTATION"
    );
    if (!wallet) {
      throw new Error(
        "Wallet not detected. To proceed, please install the Massa wallet and configure it for the Buildnet network"
      );
    }

    const accounts = await wallet.accounts();

    if (accounts.length === 0) {
      throw new Error("No accounts found");
    }

    provider = accounts[0];
  } catch (error) {
    showError(error.message);
  }
}

async function getMessage() {
  if (!provider) {
    showError("No provider found");
    return "";
  }
  try {
    const result = await provider.readSC({
      func: "getMessage",
      target: CONTRACT_ADDRESS,
    });

    return bytesToStr(result.value);
  } catch (error) {
    showError("Failed to get message: " + error.message);
    return "";
  }
}

async function setMessage(message) {
  if (!provider) {
    showError("No provider found");
    return;
  }

  if (!message) {
    showError("Message cannot be empty");
    return;
  }

  try {
    const op = await provider.callSC({
      parameter: new Args().addString(message).serialize(),
      func: "setMessage",
      target: CONTRACT_ADDRESS,
    });

    const status = await op.waitSpeculativeExecution();

    if (status !== OperationStatus.SpeculativeSuccess) {
      throw new Error("Transaction failed");
    }

    updateMessage();
  } catch (error) {
    showError("Failed to set message: " + error.message);
  }
}

async function updateMessage() {
  const messageElement = document.getElementById("message");
  messageElement.textContent = await getMessage();
}

document.addEventListener("DOMContentLoaded", async () => {
  await initProvider();

  if (!provider) {
    document.querySelector(".app-container").textContent =
      "Loading Provider...";
    return;
  }

  const form = document.getElementById("messageForm");
  const inputMessage = document.getElementById("inputMessage");
  const getMessageBtn = document.getElementById("getMessageBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await setMessage(inputMessage.value);
    inputMessage.value = "";
  });

  getMessageBtn.addEventListener("click", updateMessage);
});
