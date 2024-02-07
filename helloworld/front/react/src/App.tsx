import { useEffect, useState } from "react";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider";
import { ClientFactory, Args, bytesToStr } from "@massalabs/massa-web3";
import { Message, messages } from "./messages";
import "./App.css";

const CONTRACT_ADDRESS =
  "AS12s8GdFA6t6UGfZA1aoDgiuS77d1FxkDhfrJEuSGkupTLmnaYVd";
const minGas = 2100000
  

function App() {
  const [selectedAccount, setSelectedAccount] = useState<IAccount>();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [newMessage, setNewMessage] = useState<Message>();
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [callSCErrorMessage, setcallSCErrorMessage] = useState<any>("");
  const [lastOpId, setLastOpId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let provider = (await providers(true, 10000))[0];
        let accounts = await provider.accounts();
        if (accounts.length === 0) {
          setErrorMessage("No accounts found");
          return;
        }

        setProvider(provider);
        setAccounts(accounts)
        setSelectedAccount(accounts[0]);
      } catch (e) {
        console.log(e);
        setErrorMessage(
          "Please install massa station and the wallet plugin of Massa Labs and refresh."
        );
      }
    })();
  }, []);

  const selectAccount = async (account: IAccount) => {
    if (!provider) return;
    const providersList = await providers(true, 10000);
    const selectedProvider = providersList.find(p => p.name() === provider.name());
    if (!selectedProvider) return;
    setSelectedAccount(account);
  };

  const setMessage = async () => {
    try {
      if (!selectedAccount || !provider) {
        return;
      }
      let client = await ClientFactory.fromWalletProvider(provider, selectedAccount);
      let op_id = await client.smartContracts().callSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        functionName: "setMessage",
        parameter: new Args().addString(
          `${messages[Math.floor(Math.random() * messages.length)].message}`
        ),
        maxGas: BigInt(minGas),
        coins: BigInt(0),
        fee: BigInt(0),
      });
      setLastOpId(op_id);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setcallSCErrorMessage(errorMessage);
      setTimeout(() => {
        setcallSCErrorMessage("");
      }, 10000);
    }
  };

  const getMessage = async () => {
    try {
      if (!selectedAccount || !provider) {
        return;
      }

      let client = await ClientFactory.fromWalletProvider(provider, selectedAccount);
      let result = await client.smartContracts().readSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        targetFunction: "getMessage",
        parameter: new Args(),
        maxGas: BigInt(minGas),
      });

      const decodedMessage = bytesToStr(result.returnValue);
      console.log(decodedMessage);
      const message = messages.find((item) => item.message === decodedMessage);
      console.log(message);

      setNewMessage(message);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setcallSCErrorMessage(errorMessage);
      setTimeout(() => {
        setcallSCErrorMessage("");
      }, 10000);
    }
  };

  return (
    <div className="App theme-light">
      {errorMessage && <div className="error">{errorMessage}</div>}
      {selectedAccount && (
        <div className="container">
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
          <div>Address: {selectedAccount.address()}</div>
          {callSCErrorMessage && <div className="error">{callSCErrorMessage}</div>}
          <div>
            <button className="button w-64" onClick={setMessage} id="set">
              Set Message
            </button>
            <button className="button w-64" onClick={getMessage} id="get">
              Get Message
            </button>
          </div>

          {lastOpId ? (
            <div className="message-display" id="last-opId">
              Last Op id: {lastOpId}
            </div>
          ) : (
            <div className="message-display">
              Op id will be displayed few seconds after the transaction is sent
            </div>
          )}

          {newMessage ? (
            <div className="message-display" id="message">
              Message: {`${newMessage.message} from ${newMessage.language}`}
            </div>
          ) : (
            <div className="message-display">
              Message will be displayed few seconds after the transaction is
              sent
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
