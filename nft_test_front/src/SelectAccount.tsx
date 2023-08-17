import { IAccount } from "@massalabs/wallet-provider";

const SelectAccount = ({
  accounts,
  changeAccount,
}: {
  accounts: IAccount[];
  changeAccount: (account: IAccount) => void;
}) => (
  <div className="mas-account">
    <div className="mas-account-title">Account</div>
    <div className="mas-account-select">
      <select
        onChange={(e) => {
          const newAccount = accounts.find(
            (account) => account.address() === e.target.value
          );
          changeAccount(newAccount!);
        }}
      >
        {accounts.map((account) => (
          <option key={account.address()} value={account.address()}>
            {account.name()} {account.address()}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectAccount;
