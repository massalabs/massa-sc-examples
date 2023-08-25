import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers } from "@massalabs/wallet-provider"
import { ClientFactory } from "@massalabs/massa-web3";
import { FiEXMTvDMBlockchainCaller  } from "./helpers/FiEXMTvDMCaller"

function App() {
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [caller, setCaller] = useState<FiEXMTvDMBlockchainCaller | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [lastOpId, setlastOpId] = useState<string | null>(null);
  const [inputAge, setInputAge] = useState<number>(0);
  const [inputName, setInputName] = useState<string>("");
  const [ageResult, setAgeResult] = useState<number | null>(null);
  const [providerUsed, setProviderUsed] = useState<string>("");

  const initialize = async () => {
    try {
      console.log("Switching providers")
      const providersList = await providers(true, 10000);
      const availableProviders = providersList.filter(provider => providerUsed !== provider.name());
      if (availableProviders.length === 0) {
        console.log("All providers are currently in use.");
        return;
      }
      const provider = availableProviders[0];
      const accounts = await provider.accounts();
      if (accounts.length === 0) {
        setErrorMessage("No accounts found");
        return;
      }
      setAccount(accounts[0]);
      if (!accounts[0] || !provider) {
        return;
      }
      const client = await ClientFactory.fromWalletProvider(provider, accounts[0]);
      setCaller(await FiEXMTvDMBlockchainCaller.newDefault(client.wallet()));
      setProviderUsed(provider.name());
      console.log("Now using provider", provider.name());
    } catch (e) {
      console.log(e);
      setErrorMessage("Please install MassaStation and the plugin Massa Wallet in it and refresh.");
    }
  };

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
        if (!accounts[0] || !provider) {
          return;
        }
        const client  = await ClientFactory.fromWalletProvider(provider, accounts[0]);
        setCaller(await FiEXMTvDMBlockchainCaller.newDefault(client.wallet()));
        setProviderUsed(provider.name());
      } catch (e) {
        console.log(e);
        setErrorMessage("Please install MassaStation and the plugin Massa Wallet in it and refresh.");
      }
    };

    registerAndSetProvider();
  }, []);

  // argument is a u32 that will be passed to the smart contract
  const callChangeAge = (newAge: number) => async () => {
    try {
      if (!account || !caller) {
        return;
      }
      let result = await caller.changeAge(inputName, newAge);
      if(result.error) {
        console.error(result.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const callGetAge = async () => {
    try {
      if (!account || !caller) {
        return;
      }
      let res = await caller.getAge(inputName);

      setAgeResult(res.outputs);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bodyContent">
      {errorMessage && <div>{errorMessage}</div>}
      {account && (
        <div className="wrapper">
          <div>
            <button className="connect-button" onClick={initialize}>Switch provider</button>
          </div>
          <h1 className="messageToDisplay">Age Example: React</h1>
          <div>
            <h3>Your address: {account.address()}</h3>
            <div className="innerWrapper">
              <input type="text" value={inputName} placeholder="name" onChange={(e) => {
                setInputName(e.target.value);
                setAgeResult(null);
              }} />
              <input
                type="number"
                placeholder="age"
                value={inputAge}
                onChange={(e) => setInputAge(parseInt(e.target.value))}
              />
              <button onClick={callChangeAge(inputAge)}>
                Change age of {
                  inputName === "" ? "..." : inputName}
              </button>
            </div>
            {lastOpId && <h4>Last Op id: {lastOpId}</h4>}
            <div className="innerWrapper">
              <button onClick={callGetAge}>
                Get age of {
                  inputName === "" ? "..." : inputName}
              </button>
              {
                ageResult !== null ? <div>Age of {inputName} is {ageResult}</div> : null
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;