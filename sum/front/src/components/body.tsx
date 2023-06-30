import React from "react";
import AccountInformation from "./accountInformation";
import ContractInteraction from "./contractInteraction";
import { MASSA_EXEMPLE } from "../const";
import { IAccount } from "@massalabs/wallet-provider";

interface BodyProps {
    connected: boolean;
    account: IAccount | null;
    balance: {
        finalBalance: number;
    };
    errorMessage: string;
    connectMassaStation: () => void;
    createAccount: () => void;
}

export default function Body({
    connected,
    account,
    balance,
    errorMessage,
    connectMassaStation,
    createAccount,
}: BodyProps) {
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
                {connected && !account && (
                    <>
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
