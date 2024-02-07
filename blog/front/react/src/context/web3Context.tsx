import { ClientFactory, IClient } from "@massalabs/massa-web3";
import { providers, IAccount } from "@massalabs/wallet-provider";
import { createContext, FC, useEffect, useContext, useState } from "react";
import { Provider } from "../const";

const Web3Context = createContext<
  | {
      client?: IClient;
      selectedAccount?: IAccount;
      accounts?: IAccount[];
      provider?: Provider;
      providerAddress?: string;
      providerName?: string;
      initialize: (providerName: Provider) => void;
      selectAccount: (acccount: IAccount) => void;
      errorMessage?: string;
    }
  | undefined
>(undefined);

type TabProviderProps = {
  children: React.ReactNode;
};

export const Web3Provider: FC<TabProviderProps> = ({ children }) => {
  const [client, setClient] = useState<IClient>();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>();
  const [provider, setProvider] = useState<Provider>();
  const providerAddress = selectedAccount?.address() || "";
  const providerName = provider || "";
  const [errorMessage, setErrorMessage] = useState<string>("");

  const initialize = async (providerName: Provider) => {
    setErrorMessage("");
    const providersList = await providers(true, 10000);
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

  const selectAccount = async (account: IAccount) => {
    if (!provider) return;
    const providersList = await providers(true, 10000);
    const selectedProvider = providersList.find(p => p.name() === provider);
    if (!selectedProvider) return;
    setClient(await ClientFactory.fromWalletProvider(selectedProvider, account));
    setSelectedAccount(account);
  };

  return (
    <Web3Context.Provider
      value={{
        client,
        accounts,
        selectedAccount,
        provider,
        providerAddress,
        providerName,
        initialize,
        selectAccount,
        errorMessage,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
