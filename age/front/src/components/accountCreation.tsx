import { useState } from "react";

interface AccountCreationProps {
    createAccount: (accountName: string) => void;
}

const AccountCreation = ({ createAccount }: AccountCreationProps) => {
    const [accountName, setAccountName] = useState<string>("");
    return (
        <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
            <p className="mas-body my-4">
                You are connected to Massa Station, but you don't have any
                account yet. you can create one here:
            </p>
            <p className="address">
                <input
                    type="text"
                    className="input"
                    placeholder="Account's name"
                    onChange={(event) => setAccountName(event.target.value)}
                ></input>
                <button
                    className="bodyButton"
                    onClick={() => createAccount(accountName)}
                    disabled={accountName === ""}
                >
                    Create account
                </button>
            </p>
        </div>
    );
};

export default AccountCreation;
