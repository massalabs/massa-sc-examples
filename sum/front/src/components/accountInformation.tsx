import React, { useContext } from "react";
import { MassaContext } from "../App";

const formatAccountAddress = (accountAddress: string) => {
    const firstPart = accountAddress.substring(0, 6);
    const lastPart = accountAddress.substring(
        accountAddress.length - 5,
        accountAddress.length
    );
    return `${firstPart} ... ${lastPart}`;
};

const AccountInformation = () => {
    const { balance, account } = useContext(MassaContext)!;

    return (
        <div className="mas-body text-bold text-center p-5">
            <br />
            <p>
                Account:{" "}
                <a
                    className="mas-menu-underline font-bold text-center cursor-pointer"
                    href={`https://test.massa.net/v1/#explorer?explore=${account?.address()}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {formatAccountAddress(account?.address() || "")}
                </a>
            </p>
            <p className="accountName">Account Name: {account?.name()}</p>
            <p className="balance">Balance: {balance.finalBalance} MASSA</p>
        </div>
    );
};

export default AccountInformation;
