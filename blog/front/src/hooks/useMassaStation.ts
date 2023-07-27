import { useState, useEffect } from "react";
import {
    IAccount,
    IAccountBalanceResponse,
    IProvider,
    providers,
} from "@massalabs/wallet-provider";
import { ProviderService } from "../interfaces/ProviderService";

const NO_ACCOUNT_ERROR = "No account found";
const NOT_PROVIDER_SELECTED_ERROR = "No provider selected";
const NO_PROVIDER_ERROR = "No provider found. Run Wallet and reload page.";

const useMassaStation = (): ProviderService => {
    const [account, setAccount] = useState<IAccount | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    const [balance, setBalance] = useState<IAccountBalanceResponse>({
        finalBalance: "",
        candidateBalance: "",
    });

    const [providerList, setProviderList] = useState<IProvider[] | null>([]);

    const [errorMessage, setErrorMessage] = useState<any>(null);

    const [selectedProvider, setSelectedProvider] = useState<IProvider | null>(
        null
    );
    const [accounts, setAccounts] = useState<IAccount[] | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(
        null
    );
    const [loadingProvider, setLoadingProvider] = useState<string>(
        "Loading provider and wallet"
    );

    useEffect(() => {
        getProviderList();
    }, []);

    useEffect(() => {
        if (!selectedProvider) return;
        getAccounts(selectedProvider);
    }, [selectedProvider]);

    const getProviderList = async () => {
        try {
            const providersList = await providers();
            if (providersList.length === 0) {
                setLoadingProvider("No provider detected");
                throw new Error(NO_PROVIDER_ERROR);
            }
            setProviderList(providersList);
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    async function getAccounts(provider: IProvider) {
        try {
            const data = await provider.accounts();
            setAccounts(data);
            setSelectedAccount(data[0]);
            if (data.length === 0) {
                setLoadingProvider("No account detected.");
                setErrorMessage(NO_ACCOUNT_ERROR);
            }
        } catch (error) {
            setLoadingProvider("No account detected.");
            setErrorMessage(NO_ACCOUNT_ERROR);
        }
    }

    async function connect(account: IAccount): Promise<void> {
        try {
            setConnected(true);
            setAccountInfo(account);
            setErrorMessage("");
        } catch (error) {
            console.error("Error while connecting to Massa Station: ", error);
            resetAccountInfo();
            setConnected(false);
            setErrorMessage(
                "Massa Station is not running or the wallet plugin is not installed."
            );
        }
    }

    async function fetchBalance(
        account: IAccount
    ): Promise<IAccountBalanceResponse> {
        try {
            const balance = await account.balance();
            return balance;
        } catch (error) {
            console.error("Error while retrieving balance: ", error);
            return { finalBalance: "0", candidateBalance: "0" };
        }
    }

    async function createAccount(
        accountName: string,
        provider: IProvider
    ): Promise<void> {
        try {
            await provider.generateNewAccount(accountName);
            const data = await provider.accounts();
            setAccounts(data);
            const firstAccount = data[0];

            if (firstAccount) {
                setSelectedAccount(firstAccount);
                await setAccountInfo(firstAccount);
            } else {
                throw new Error(NO_ACCOUNT_ERROR);
            }
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    }

    async function setAccountInfo(account: IAccount) {
        setAccount(account);
        setBalance(await fetchBalance(account));
    }

    function resetAccountInfo() {
        setAccount(null);
        setBalance({ finalBalance: "0", candidateBalance: "0" });
    }

    return {
        connected,
        balance,
        account,
        errorMessage,
        connect,
        createAccount,
        providerList,
        setSelectedProvider,
        selectedProvider,
        accounts,
        selectedAccount,
        setSelectedAccount,
        loadingProvider,
    };
};

export default useMassaStation;
