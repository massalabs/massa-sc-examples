import useNft from "./useNft";
import SelectAccount from "./SelectAccount";
import DisplayAccounts from "./DisplayAccount";
import ButtonColumn from "./ButtonColumn";
import { useState } from "react";
import { IClient } from "@massalabs/massa-web3";

export default function AutonomousPriceInteraction() {
  const {
    client,
    loading,
    accounts,
    changeAccount,
    mintToken,
    approve,
    approveForAll,
    transferFrom,
    isApprovedForAll,
    fetchApproved,
    setURI,
    fetchTokenURI,
    fetchBaseURI,
    fetchOwner,
    fetchCurrentSupply,
    fetchTotalSupply,
    fetchName,
    fetchSymbol,
    fetchBalanceOf,
  } = useNft();

  const actionsRead = [
    [
      { label: "Verify Ownership", onClick: fetchOwner, load: "owner" },
      { label: "Verify Name", onClick: fetchName, load: "name" },
      { label: "Verify Symbol", onClick: fetchSymbol, load: "symbol" },
      { label: "Verify Base URI", onClick: fetchBaseURI, load: "baseURI" },
      { label: "Verify Token URI", onClick: fetchTokenURI, load: "tokenURI" },
      { label: "Verify Balance", onClick: fetchBalanceOf, load: "balanceOf" },
    ],
    [
      {
        label: "Verify Current Supply",
        onClick: fetchCurrentSupply,
        load: "currentSupply",
      },
      {
        label: "Verify Total Supply",
        onClick: fetchTotalSupply,
        load: "totalSupply",
      },
      { label: "Verify Approval", onClick: fetchApproved, load: "approved" },
      {
        label: "Verify Approved For All",
        onClick: isApprovedForAll,
        load: "approvedForAll",
      },
    ],
  ];

  const actionWrite = [
    [
      { label: "Mint Token", onClick: mintToken, load: "mint" },
      { label: "Transfer token", onClick: transferFrom, load: "transfer" },
      { label: "Set New Base URI", onClick: setURI, load: "setURI" },
    ],
    [
      {
        label: "Approve for all",
        onClick: approveForAll,
        load: "approveForAll",
      },
      { label: "Approve Token", onClick: approve, load: "approve" },
    ],
  ];

  return (
    <div className="centered-content">
      <div className="title">Massa NFT Interaction</div>
      {/* Current Client account */}
      <DisplayClientAccountAddress
        address={client?.wallet().getBaseAccount()?.address() || ""}
      />
      <SelectAccount accounts={accounts} changeAccount={changeAccount} />
      <DisplayAccounts accounts={accounts} />

      <div className="mas-body">
        <h2>Read</h2>
        <div className="button-columns">
          {actionsRead.map((column, columnIndex) => (
            <ButtonColumn
              key={columnIndex}
              actions={column}
              loading={loading}
            />
          ))}
        </div>
        <hr />

        <h2>Write</h2>
        <div className="button-columns">
          {actionWrite.map((column, columnIndex) => (
            <ButtonColumn
              key={columnIndex}
              actions={column}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function DisplayClientAccountAddress({ address }: { address: string }) {
  return (
    <div className="mas-header">
      <div className="mas-header-item">
        <div>
          <div className="mas-header-item-label">Current Account</div>
          <div className="mas-header-item-value">{address}</div>
        </div>
      </div>
    </div>
  );
}
