import { useWeb3 } from "../context/web3Context";
import "../css/AccountSelector.css";

export const AccountSelect = () => {
  const { accounts, selectAccount } = useWeb3();

  if (!accounts || accounts.length === 0) {
    return <div>No accounts available</div>;
  }

  return (
    <div className="account-select-container flex w-full gap-4 justify-center items-center">
      <label htmlFor="account-selector" className="account-select-label">Select Your Account</label>
      <select
        id="account-selector"
        className="account-select-dropdown"
        onChange={(e) => selectAccount(accounts[parseInt(e.target.value)])}
      >
        {accounts.map((account, index) => (
          <option value={index} key={account.address()}>
            Account {account.name()} : {account.address().substring(0, 6)}...{account.address().substring(account.address().length - 4)}
          </option>
        ))}
      </select>
    </div>
  );
};