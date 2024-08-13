import { useEffect, useState } from "react";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider";
import { ClientFactory, Args, bytesToStr } from "@massalabs/massa-web3";
import { Message, messages } from "./messages";
import "./App.css";

const CONTRACT_ADDRESS =
  "AS12s8GdFA6t6UGfZA1aoDgiuS77d1FxkDhfrJEuSGkupTLmnaYVd";

function App() {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [newMessage, setNewMessage] = useState<Message>();
  const [errorMessage, setErrorMessage] = useState<any>("");
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
        setAccount(accounts[0]);
      } catch (e) {
        console.log(e);
        setErrorMessage(
          "Please install massa station and the wallet plugin of Massa Labs and refresh."
        );
      }
    })();
  }, []);

  const setMessage = async () => {
    try {
      if (!account || !provider) {
        return;
      }
      let client = await ClientFactory.fromWalletProvider(provider, account);
      let op_id = await client.smartContracts().callSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        functionName: "setMessage",
        parameter: new Args().addString(
          `${messages[Math.floor(Math.random() * messages.length)].message}`
        ),
        maxGas: BigInt(1000000),
        coins: BigInt(0),
        fee: BigInt(0),
      });
      setLastOpId(op_id);
    } catch (error) {
      console.error(error);
    }
  };

  const getMessage = async () => {
    try {
      if (!account || !provider) {
        return;
      }

      let client = await ClientFactory.fromWalletProvider(provider, account);
      let result = await client.smartContracts().readSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        targetFunction: "getMessage",
        parameter: new Args(),
        maxGas: BigInt(1000000),
      });

      const decodedMessage = bytesToStr(result.returnValue);
      console.log(decodedMessage);
      const message = messages.find((item) => item.message === decodedMessage);
      console.log(message);

      setNewMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App theme-light">
      {errorMessage && <div>{errorMessage}</div>}
      {account && (
        <div className="container">
          <div>Address: {account.address()}</div>

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
