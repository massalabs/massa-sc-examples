import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import {
  IAccount,
  IProvider,
  getProviderByName,
} from "@massalabs/wallet-provider";

import {
  ClientFactory,
  Args,
  Client,
  bytesToStr,
  fromMAS,
  MAX_GAS_CALL,
} from "@massalabs/massa-web3";

const CONTRACT_ADDRESS =
  "AS12L26PU9UoUs9gEsBZKMWUW4MKudKw2XtCKUZouXVFPiePPwfEX";
const coins = 0.1;
const operationDelayNotice =
  "If there's no change, please wait a few seconds before clicking again. Confirmation of the operation may take up to 16 seconds.";
const errorMessageNotEnoughBalance = `You need a minimum of ${coins} MAS to set the age.`;
const errorMessageNotEnoughCoins = "enough balance to pay for the coins";
enum Provider {
  MASSASTATION = "MASSASTATION",
  BEARBY = "BEARBY",
}

function App() {
  const [client, setClient] = useState<Client>();
  const [provider, setProvider] = useState<IProvider>();
  const [account, setAccount] = useState<IAccount>();
  const [lastOpId, setLastOpId] = useState<string>();
  const [ageResult, setAgeResult] = useState<string>();
  const [inputAge, setInputAge] = useState<number>(0);
  const [inputName, setInputName] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [AccountObserver, setAccountObserver] = useState<any>();
  const [NetworkObserver, setNetworkObserver] = useState<any>();

  function subscribeToAccountChanges() {
    return provider?.listenAccountChanges(async (address: string) => {
      console.log(address);
      setClientAndAccount();
    });
  }

  // same for network changes
  function subscribeToNetworkChanges() {
    return provider?.listenNetworkChanges(async (network: string) => {
      console.log(network);
    });
  }

  const initialize = async (providerName: Provider) => {
    setErrorMessage(null);

    const selectedProvider = await getProviderByName(providerName);
    if (!selectedProvider) {
      setErrorMessage(
        "Please install MassaStation and the plugin Massa Wallet in it and refresh."
      );
      return;
    }

    setProvider(selectedProvider);
  };

  async function setClientAndAccount() {
    if (!provider) return;
    const accounts = await provider.accounts();
    if (accounts.length === 0) {
      setErrorMessage("No accounts found");
      return;
    }
    const c = await ClientFactory.fromWalletProvider(provider, accounts[0]);
    setClient(c);
    setAccount(accounts[0]);
  }

  useEffect(() => {
    if (provider && !client) {
      setClientAndAccount();
    }
    if (!AccountObserver && account) {
      console.log("subscribeToAccountChanges");
      setAccountObserver(subscribeToAccountChanges());
    }
    if (!NetworkObserver) {
      console.log("subscribeToNetworkChanges");
      setNetworkObserver(subscribeToNetworkChanges());
    }
  }, [provider, account]);

  useEffect(() => {
    initialize(Provider.MASSASTATION);
    return () => {
      AccountObserver?.unsubscribe();
      NetworkObserver?.unsubscribe();
    };
  }, []);

  const updateAge = (newAge: number) => async () => {
    setErrorMessage(null);
    if (!client) return;
    if (!inputName) {
      setErrorMessage("Please enter a name");
      return;
    }
    try {
      let args = new Args().addString(inputName).addU32(newAge);
      let opId = await client.smartContracts().callSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        functionName: "changeAge",
        parameter: args,
        maxGas: BigInt(1000000),
        coins: fromMAS(coins),
        fee: BigInt(0),
      });
      setLastOpId(opId);
    } catch (error: any) {
      if (error.message.includes(errorMessageNotEnoughCoins)) {
        setErrorMessage(errorMessageNotEnoughBalance);
      }
    }
  };

  const getAge = async () => {
    setErrorMessage(null);
    if (!client) return;
    if (!inputName) {
      setErrorMessage("Please enter a name");
      return;
    }
    try {
      let res = await client.smartContracts().readSmartContract({
        maxGas: MAX_GAS_CALL,
        targetAddress: CONTRACT_ADDRESS,
        targetFunction: "getAge",
        parameter: new Args().addString(inputName).serialize(),
      });

      setAgeResult(bytesToStr(res.returnValue));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bodyContent">
      <SelectProvider
        selectedProvider={provider?.name()}
        onClick={(providerName) => {
          initialize(providerName);
        }}
      />
      {account && (
        <div className="wrapper">
          <h1 className="messageToDisplay">Age Example: React</h1>
          <div>
            <InfoWrapper
              address={account.address()}
              provider={provider?.name() || ""}
              lastOpId={lastOpId}
            />
            <div className="action-wrapper">
              <div className="input-wrapper">
                <input
                  id="name"
                  type="text"
                  value={inputName}
                  placeholder="name"
                  onChange={(e) => {
                    setInputName(e.target.value);
                    setAgeResult(undefined);
                  }}
                />
                <input
                  id="age"
                  type="number"
                  placeholder="age"
                  value={inputAge}
                  onChange={(e) => setInputAge(parseInt(e.target.value))}
                />
              </div>
              <div className="action-button-wrapper">
                <button id="btnChangeAge" onClick={updateAge(inputAge)}>
                  Change age of {inputName === "" ? "..." : inputName}
                </button>

                <button id="btnGetAge" onClick={getAge}>
                  Get age of {inputName === "" ? "..." : inputName}
                </button>
              </div>
              {ageResult !== undefined && (
                <div id="result">
                  <p>
                    Age of {inputName} is {ageResult}
                  </p>
                  <p>{operationDelayNotice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default App;

const SelectProvider = ({
  onClick,
  selectedProvider,
}: {
  onClick: (providerName: Provider) => void;
  selectedProvider?: string;
}) => {
  return (
    <div className="select-provider">
      <button
        className="select-provider__button"
        onClick={() => onClick(Provider.MASSASTATION)}
        disabled={selectedProvider === Provider.MASSASTATION}
      >
        Use Massa Station
      </button>
      <button
        className="select-provider__button"
        onClick={() => onClick(Provider.BEARBY)}
        disabled={selectedProvider === Provider.BEARBY}
      >
        Use Bearby
      </button>
    </div>
  );
};

const InfoWrapper = ({
  address,
  provider,
  lastOpId,
}: {
  address: string;
  provider: string;
  lastOpId?: string;
}) => {
  return (
    <div className="info-wrapper">
      <h3 id="address">Your address: {address}</h3>
      <h3 id="provider">Provider: {provider}</h3>
      {lastOpId && <h4 id="lastOpId">Last Op id: {lastOpId}</h4>}
    </div>
  );
};
