import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers } from "@massalabs/wallet-provider";
import {
  ClientFactory,
  Args,
  Client,
  bytesToStr,
  fromMAS,
} from "@massalabs/massa-web3";

const CONTRACT_ADDRESS =
  "AS12S1xuDVdpTMGhs19iBo3HXRQqZZaFzSF1hkz1RdF5YxqqVvTnb";
const coins = 0.1;
const minGas = 2100000
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
  const [provider, setProvider] = useState<Provider>();
  const [selectedAccount, setSelectedAccount] = useState<IAccount>();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [lastOpId, setLastOpId] = useState<string>();
  const [ageResult, setAgeResult] = useState<string>();
  const [inputAge, setInputAge] = useState<number>(0);
  const [inputName, setInputName] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<any>();

  const selectAccount = async (account: IAccount) => {
    if (!provider) return;
    const providersList = await providers();
    const selectedProvider = providersList.find(p => p.name() === provider);
    if (!selectedProvider) return;
    setClient(await ClientFactory.fromWalletProvider(selectedProvider, account));
    setSelectedAccount(account); // Update the selected account
  };

  const initialize = async (providerName: Provider) => {
    setErrorMessage(null);
    const providersList = await providers();
    const selectedProvider = providersList.find(
      (p) => p.name() === providerName
    );

    if (!selectedProvider) {
      setErrorMessage(
        "Please install MassaStation and the plugin Massa Wallet in it and refresh."
      );
      return;
    }

    const accounts = await selectedProvider.accounts();

    if (accounts.length === 0) {
      setErrorMessage("No accounts found");
      return;
    }
    setClient(
      await ClientFactory.fromWalletProvider(selectedProvider, accounts[0])
    );
    setProvider(providerName);
    setAccounts(accounts)
    setSelectedAccount(accounts[0]);
  };

  useEffect(() => {
    initialize(Provider.MASSASTATION);
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
        maxGas: BigInt(minGas),
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
      const res = await client.smartContracts().readSmartContract({
        maxGas: BigInt(minGas),
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
        selectedProvider={provider}
        onClick={(providerName) => {
          initialize(providerName);
        }}
      />
      {selectedAccount && (
        <div className="wrapper">
          <h1 className="messageToDisplay">Age Example: React</h1>
          <div>
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
            <InfoWrapper
              address={selectedAccount.address()}
              provider={provider || ""}
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
  selectedProvider?: Provider;
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
