import React, { useState } from "react";
import ContractInteraction from "./contractInteraction";

const MASSA_STATION_URL = "https://my.massa/";
const MASSA_STATION_WALLET_URL = "http://localhost:8080/"; //https://my.massa/thyra/plugin/massalabs/wallet/rest/wallet

async function getAllAccounts() {
  // empty the message
  document.getElementsByClassName("messageToDisplay")[0].innerHTML = "";

  // get the accounts from the wallet plugin
  const url = MASSA_STATION_WALLET_URL + "api/accounts";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

export default function Body() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  function createAccount() {
    // empty the message
    document.getElementsByClassName("messageToDisplay")[0].innerHTML = "";

    // create an account
    const url =
      MASSA_STATION_WALLET_URL +
      "api/accounts/" +
      document.getElementsByClassName("input")[0].value;
    console.log(url);
    const response = fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // set the account
        getAllAccounts().then((data) => {
          if (data.length > 0) {
            setAccount(data[0].address);
          } else if (data === []) {
            setAccount("No account found");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setAccount("Unable to fetch data");
      });
  }

  function onMSDisconnected(message) {
    setConnected(false);
    console.log("Disconnected from Massa Station");
    // replace className MSDisconnected with message
    document.getElementsByClassName("messageToDisplay")[0].innerHTML = message;
  }

  function onMSConnected() {
    console.log("Connected to Massa Station");
    setConnected(true);

    // set the account
    getAllAccounts().then((data) => {
      if (data.length > 0) {
        setAccount(data[0].address);
        setBalance(data[0].balance);
      } else {
        setAccount("No account found");
        setBalance("0");
      }
    });
  }

  // check if Massa Station is running with the wallet plugin
  function connectMassaStation() {
    // check is Massa Station is running
    let ok = true;
    fetch(MASSA_STATION_URL + "massa/node", { method: "GET" })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => (ok = false))
      .finally(() => {
        if (ok) {
          // check if wallet plugin is installed
          fetch(MASSA_STATION_WALLET_URL + "api/accounts", { method: "GET" })
            .then((response) => response.json())
            .catch((error) => (ok = false))
            .finally(() => {
              if (ok) {
                onMSConnected();
              } else {
                onMSDisconnected(
                  "The MassaStation wallet plugin is not running"
                );
              }
            });
        } else {
          onMSDisconnected("Massa Station is not running");
        }
      });
  }

  return (
    <div className="body">
      {/* Title and quick presentation of the smart contract related to this front end */}
      <h1 className="bodyTitle">Sum calculator</h1>
      <p className="bodyText">
        This is a simple calculator that adds two numbers together.
      </p>

      <div className="bodyContent">
        {!connected && (
          <button className="bodyButton" onClick={connectMassaStation}>
            Connect to Massa Station
          </button>
        )}
        {connected && account === "No account found" && (
          <div>
            <br></br>
            <p className="address">
              No account found. Create an account by clicking the button below.
              <br></br>
              <input
                type="text"
                className="input"
                placeholder="Account's name"
              ></input>
              <button className="bodyButton" onClick={createAccount}>
                Create account
              </button>
            </p>
          </div>
        )}
        {connected && account !== "No account found" && (
          <div>
            <div className="accountInfo">
              <br></br>
              <p className="address">
                Account :{" "}
                <a
                  className="addressLink"
                  href={"https://massa.net/testnet/" + account}
                >
                  {account.substring(0, 6) +
                    " ... " +
                    account.substring(account.length - 5, account.length)}
                </a>
              </p>
              <p className="balance">Balance : {balance} MASSA</p>
            </div>
            <br></br>
            <ContractInteraction />
          </div>
        )}
      </div>
      <div className="messageToDisplay"></div>
    </div>
  );
}
