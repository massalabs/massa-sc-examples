import React, { useState, useEffect } from "react";
import "./App.css";
import { getWallets, WalletName } from "@massalabs/wallet-provider";
import {
  Args,
  bytesToStr,
  OperationStatus,
  Provider,
} from "@massalabs/massa-web3";

const CONTRACT_ADDRESS =
  "AS12mFfp7XA8U5QyRPBWNT5V5BLeEMxuoxHft5Ph8y9uGH2SecDXw";

function App() {
  const [provider, setProvider] = useState<Provider>();
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const getMessage = async () => {
    if (!provider) {
      console.log("No provider found");
      return "";
    }
    const result = await provider.readSC({
      func: "getMessage",
      target: CONTRACT_ADDRESS,
    });

    return bytesToStr(result.value);
  };

  async function initProvider() {
    const walletList = await getWallets();
    const wallet = walletList.find(
      (provider) => provider.name() === WalletName.MassaWallet
    );
    if (!wallet) {
      console.log("No wallet found");
      return;
    }

    const accounts = await wallet?.accounts();

    if (accounts.length === 0) {
      console.log("No accounts found");
      return;
    }

    // We use the first account as the provider
    const provider = accounts[0];
    setProvider(provider);
  }

  useEffect(() => {
    initProvider();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!provider) {
      alert("No provider found");
      return;
    }

    e.preventDefault();

    if (!inputMessage) {
      alert("Message cannot be empty");
    }

    const op = await provider.callSC({
      parameter: new Args().addString(inputMessage).serialize(),
      func: "setMessage",
      target: CONTRACT_ADDRESS,
    });

    const status = await op.waitSpeculativeExecution();

    if (status !== OperationStatus.SpeculativeSuccess) {
      alert("Failed to set message");
      return;
    }

    setMessage(await getMessage());
    setInputMessage("");
  };

  if (!provider) {
    return (
      <div className="app-container">
        <p>Loading Provider... </p>
        <p>
          Please install the Massa wallet and configure it for the Buildnet
          network
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="card-title">Message App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter a message"
            className="input"
          />
          <button type="submit" className="button">
            Set Message
          </button>
        </form>
        <button
          className="button"
          onClick={async () => setMessage(await getMessage())}
        >
          Get Message
        </button>
        <div>
          <p className="message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
