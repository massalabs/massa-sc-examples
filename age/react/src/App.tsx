import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers } from "@massalabs/wallet-provider"
import { ClientFactory, IClient, bytesToU32, Args } from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = "AS1284LtJxDNyYTMLioPtbnsF3h3xAXMFnDF1kBrKBjN4WDSdbzsw";

function App() {
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [client, setClient] = useState<IClient | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [lastOpId, setlastOpId] = useState<string | null>(null);
  const [inputAge, setInputAge] = useState<number>(0);
  const [inputName, setInputName] = useState<string>("");
  const [ageResult, setAgeResult] = useState<number | null>(null);

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
      let args = new Args().addString(inputName).addU32(newAge);
      let opId = await client.smartContracts().callSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        functionName: "changeAge",
        parameter: args.serialize(),
        maxGas: BigInt(1000000),
        coins: BigInt(0),
        fee: BigInt(0),
      });
      setlastOpId(opId);
    } catch (error) {
      console.error(error);
    }
  };

  const callGetAge = async () => {
    try {
      if (!account || !client) {
        return;
      }
      let res = await client.smartContracts().readSmartContract({
        maxGas: BigInt(1000000),
        targetAddress: CONTRACT_ADDRESS,
        targetFunction: "getAge",
        parameter: new Args().addString(inputName).serialize(),
      });

      setAgeResult(bytesToU32(res.returnValue));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bodyContent">
      {errorMessage && <div>{errorMessage}</div>}
      {account && (
        <div className="wrapper">
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