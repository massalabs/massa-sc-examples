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
    const [connected, setConnected] = useState<boolean>(false);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [balance, setBalance] = useState<IAccountBalanceResponse>({
        finalBalance: "",
        candidateBalance: "",
    });
    const [errorMessage, setErrorMessage] = useState<any>(null);

    const [providerList, setProviderList] = useState<IProvider[] | null>([]);
    const [providerSelected, setProviderSelected] = useState<IProvider | null>(
        null
    );
    const [accounts, setAccounts] = useState<IAccount[] | null>(null);
    const [accountSelected, setAccountSelected] = useState<IAccount | null>(
        null
    );
    const [loadingProvider, setLoadingProvider] = useState<string>(
        "loading provider and wallet"
    );

    useEffect(() => {
        const registerAndproviderList = async () => {
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

        registerAndproviderList();
    }, []);

    useEffect(() => {
        const registerAndGetAccounts = async () => {
            if (providerSelected) {
                try {
                    const result = await providerSelected.accounts();
                    setAccounts(result);
                    setAccountSelected(result[0]);
                    if (result.length === 0) {
                        setLoadingProvider("No account detected.");
                        setErrorMessage(NO_ACCOUNT_ERROR);
                    }
                } catch (error) {
                    setLoadingProvider("No account detected.");
                    setErrorMessage(NO_ACCOUNT_ERROR);
                }
            }
        };

        registerAndGetAccounts();
    }, [providerSelected]);

    async function getFirstAccount() {
        if (!providerSelected) {
            console.log("No provider selected");
            return null;
        }
        const data = await providerSelected.accounts();
        if (data.length > 0) {
            return data[0];
        }
    }

    async function connect(): Promise<void> {
        try {
            setConnected(true);
            if (accountSelected) {
                setAccountInfo(accountSelected);
                setErrorMessage("");
            } else {
                setErrorMessage(NO_ACCOUNT_ERROR);
            }
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

    async function createAccount(accountName: string): Promise<void> {
        setErrorMessage("");
        try {
            if (!providerSelected) {
                throw new Error(NOT_PROVIDER_SELECTED_ERROR);
            }
            await providerSelected.generateNewAccount(accountName);
            const firstAccount = await getFirstAccount();
            if (firstAccount) {
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
        setProviderSelected,
        providerSelected,
        accounts,
        setAccountSelected,
        accountSelected,
        loadingProvider,
    };
};

export default useMassaStation;
