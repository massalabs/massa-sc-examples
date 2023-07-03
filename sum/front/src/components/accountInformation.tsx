import React from "react";

interface AccountInformationProps {
    accountAddress: string;
    accountName: string;
    balance: string;
}

const formatAccountAddress = (accountAddress: string) => {
    const firstPart = accountAddress.substring(0, 6);
    const lastPart = accountAddress.substring(
        accountAddress.length - 5,
        accountAddress.length
    );
    return `${firstPart} ... ${lastPart}`;
};

const AccountInformation: React.FC<AccountInformationProps> = ({
    accountAddress,
    accountName,
    balance,
}) => (
    <div>
        <div className="accountInfo">
            <br />
            <p className="address">
                Account:{" "}
                <a
                    className="addressLink"
                    href={`https://test.massa.net/v1/#explorer?explore=${accountAddress}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {formatAccountAddress(accountAddress)}
                </a>
            </p>
            <p className="accountName">Account Name: {accountName}</p>
            <p className="balance">Balance: {balance} MASSA</p>
        </div>
    </div>
);

export default AccountInformation;
