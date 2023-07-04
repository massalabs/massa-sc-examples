import AccountInformation from "./accountInformation";
import ContractInteraction from "./contractInteraction";
import { ProviderService } from "../interfaces/ProviderService";
import { useState } from "react";

export default function Body({
    connect,
    createAccount,
    connected,
    account,
    balance,
    errorMessage,
}: ProviderService) {
    const [accountName, setAccountName] = useState<string>("");
    return (
        <div className="body">
            <div className="bodyContent">
                {!connected && (
                    <>
                        <button className="bodyButton" onClick={connect}>
                            Connect to Massa Station
                        </button>
                    </>
                )}
                {connected && !account && (
                    <>
                        <p className="bodyText">
                            You are connected to Massa Station, but you don't
                            have any account yet. you can create one here:
                        </p>
                        <p className="address">
                            <input
                                type="text"
                                className="input"
                                placeholder="Account's name"
                                onChange={(event) =>
                                    setAccountName(event.target.value)
                                }
                            ></input>
                            <button
                                className="bodyButton"
                                onClick={() => createAccount(accountName)}
                                disabled={accountName === ""}
                            >
                                Create account
                            </button>
                        </p>
                    </>
                )}
                {connected && account && (
                    <>
                        <AccountInformation
                            accountAddress={account.address()}
                            accountName={account.name()}
                            balance={balance.finalBalance}
                        />
                        <br></br>
                        <ContractInteraction account={account} />
                    </>
                )}
            </div>
            <div className="messageToDisplay">{errorMessage}</div>
        </div>
    );
}
