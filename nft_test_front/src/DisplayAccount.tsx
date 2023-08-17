import { IAccount } from "@massalabs/wallet-provider";

const DisplayAccounts = ({ accounts }: { accounts: IAccount[] }) => (
  <div className="mas-account">
    <div className="mas-account-title">Account</div>
    <div className="mas-account-select">
      {accounts.map((account) => (
        <div key={account.address()}>
          {account.address() + ": " + account.name()}
        </div>
      ))}
    </div>
  </div>
);

export default DisplayAccounts;
