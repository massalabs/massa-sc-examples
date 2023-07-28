import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers } from "@massalabs/wallet-provider"
import { ClientFactory, IClient } from "@massalabs/massa-web3";
import { Args } from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = "A12VVvTD8bdj1LDwc2uuFNKxT26AxQGv8aDgpWS9EVjekEwTZSab";

function App() {
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [client, setClient] = useState<IClient | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [lastOpId, setlastOpId] = useState<string | null>(null);
  const [inputAge, setInputAge] = useState<number>(0);

  useEffect(() => {
    const registerAndSetProvider = async () => {
      try {
        let provider = (await providers(true, 10000))[0];
        let accounts = await provider.accounts();
        if (accounts.length === 0) {
          setErrorMessage("No accounts found");
          return;
        }
        setAccount(accounts[0]);
        if (!account || !provider) {
          return;
        }
        setClient(await ClientFactory.fromWalletProvider(provider, account));
      } catch (e) {
        console.log(e);
        setErrorMessage("Please install massa station and the wallet plugin of Massa Labs and refresh.");
      }
    };

    registerAndSetProvider();
  }, [account]);

  // argument is a u32 that will be passed to the smart contract
  const callChangeAge = (newAge: number) => async () => {
    try {
      if (!account || !client) {
        return;
      }
      let op_id = await client.smartContracts().callSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        functionName: "changeAge",
        parameter: new Args().addU32(newAge).serialize(),
        maxGas: BigInt(1000000),
        coins: BigInt(0),
        fee: BigInt(0),
      });
      setlastOpId(op_id);
    } catch (error) {
      console.error(error);
    }
  };

  const callGetAge = async () => {
    try {
      if (!account || !client) {
        return;
      }
      let age = await client.smartContracts().callSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        functionName: "getAge",
        parameter: new Args().serialize(),
        maxGas: BigInt(1000000),
        coins: BigInt(0),
        fee: BigInt(0),
      });
      console.log("Age", age);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App theme-light">
      {errorMessage && <div>{errorMessage}</div>}
      {account && (
        <div>
          <div>Address: {account.address()}</div>
          <input
            className="input w-64"
            type="number"
            value={inputAge}
            onChange={(e) => setInputAge(parseInt(e.target.value))}
          />
          <button className="button w-64" onClick={callChangeAge(inputAge)}>
            Change age
          </button>
          <button className="button w-64" onClick={callGetAge}>
            Get age
          </button>
        </div>
      )}
      {lastOpId && <div>Last Op id: {lastOpId}</div>}
    </div>
  );
}

export default App;