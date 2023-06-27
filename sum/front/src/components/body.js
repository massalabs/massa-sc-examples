import React, { useState } from "react";
import ContractInteraction from "./contractInteraction";
import { providers } from "@massalabs/wallet-provider";
import { MASSA_EXEMPLE } from "../const/const";

export default function Body() {
    const [connected, setConnected] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");
    const [balance, setBalance] = useState(-1);
    const [account, setAccount] = useState(null);
    const [messageToDisplay, setMessageToDisplay] = useState("");

    // setup a new provider: MassaStation
    const registerEvent = new CustomEvent("register", {
        detail: { providerName: "MASSASTATION" },
    });
    document.getElementById("massaWalletProvider").dispatchEvent(registerEvent);

    const provider = providers()[0]; // this is a massaStation object

    // get all the accounts and returns them in an array
    async function getAllAccounts() {
        // empty the message
        try {
            document.getElementsByClassName("messageToDisplay")[0].innerHTML =
                "";
        } catch (error) {
            console.log(error);
        }

        try {
            // get all the accounts
            const accounts = await provider.accounts();
            return accounts;
        } catch (error) {
            console.log("Error while retrieving accounts: ", error);
            setMessageToDisplay("Error while retrieving accounts: " + error);
            return [];
        }
    }

    // check if Massa Station is running with the wallet plugin
    async function isMassaStationRunning() {
        try {
            await getAllAccounts();
            return true;
        } catch (error) {
            return false;
        }
    }

    // account is a MassaStation object
    async function getBalance(account) {
        try {
            const balance = await account.balance();
            setBalance(balance.finalBalance);
        } catch (error) {
            console.log("Error while retrieving balance: ", error);
            return 0;
        }
    }

    async function createAccount() {
        // empty the message
        setMessageToDisplay("");

        try {
            // create an account
            const newAccountData = await provider.generateNewAccount(
                document.getElementsByClassName("input")[0].value
            );
            console.log("new account created: ", newAccountData);
            setAccountAddress(newAccountData.address);
            setAccountName(newAccountData.name);
            setAccount(newAccountData);
            getBalance(newAccountData);
        } catch (error) {
            console.log(error);
            setMessageToDisplay(error);
            return;
        }
    }

    async function onMSConnected() {
        console.log("Connected to Massa Station");
        setConnected(true);
        // set the account
        getAllAccounts().then(async (data) => {
            if (data.length > 0) {
                // set constants
                setAccountAddress(data[0]._address);
                setAccountName(data[0]._name);
                getBalance(data[0]);
                setAccount(data[0]);
            } else {
                setAccountAddress("No account found");
                setAccountName("No account found");
                setBalance("0");
            }
        });
    }

    function onMSDisconnected(message) {
        setConnected(false);
        setAccount(null);
        console.log("Disconnected from Massa Station");
        // replace className MSDisconnected with message
        setMessageToDisplay(message);
    }

    // check if Massa Station is running with the wallet plugin
    function connectMassaStation() {
        // check if Massa Station is running with the wallet plugin
        (async () => {
            const isRunning = await isMassaStationRunning();
            if (isRunning) {
                onMSConnected();
            } else {
                onMSDisconnected(
                    "Massa Station is not running or the wallet plugin is not installed."
                );
            }
        })();
    }

    return (
        <div className="body">
            {/* Title and quick presentation of the smart contract related to this front end */}
            <h1 className="bodyTitle">{MASSA_EXEMPLE.TITLE}</h1>
            <p className="bodyText">{MASSA_EXEMPLE.DESCRIPTION}</p>

            <div className="bodyContent">
                {!connected && (
                    <button
                        className="bodyButton"
                        onClick={connectMassaStation}
                    >
                        Connect to Massa Station
                    </button>
                )}
                {connected && account === "No account found" && (
                    <div>
                        <br></br>
                        <p className="address">
                            No account found. Create an account by clicking the
                            button below.
                            <br></br>
                            <input
                                type="text"
                                className="input"
                                placeholder="Account's name"
                            ></input>
                            <button
                                className="bodyButton"
                                onClick={createAccount}
                            >
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
                                    href={
                                        "https://test.massa.net/v1/#explorer?explore=" +
                                        accountAddress
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {accountAddress.substring(0, 6) +
                                        " ... " +
                                        accountAddress.substring(
                                            accountAddress.length - 5,
                                            accountAddress.length
                                        )}
                                </a>
                            </p>
                            <p className="accountName">
                                Account Name : {accountName}
                            </p>
                            <p className="balance">Balance : {balance} MASSA</p>
                        </div>
                        <br></br>
                        <ContractInteraction account={account} />
                    </div>
                )}
            </div>
            <div className="messageToDisplay">{messageToDisplay}</div>
        </div>
    );
}
