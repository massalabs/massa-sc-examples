import { useState, useEffect } from "react";
import {
    IAccount,
    IAccountBalanceResponse,
    IProvider,
    providers,
} from "@massalabs/wallet-provider";
import { ProviderService } from "../interfaces/ProviderService";

const MASSA_STATION = "MASSASTATION";
const MASSA_WALLET_PROVIDER = "massaWalletProvider";
const NO_ACCOUNT_ERROR = "No account found";
const MASSA_STATION_NOT_RUNNING_ERROR =
    "Massa Station is not running or the wallet plugin is not installed.";
const EMPTY_BALANCE = { finalBalance: "0", candidateBalance: "0" };

const registerEvent = (name: string, id: string) => {
    const registerEvent = new CustomEvent("register", {
        detail: { providerName: name },
    });
    const element = document.getElementById(id);
    if (element) {
        element.dispatchEvent(registerEvent);
    }
};

const UseMassaStation = (): ProviderService => {
    const [connected, setConnected] = useState<boolean>(false);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [balance, setBalance] = useState<IAccountBalanceResponse>({
        finalBalance: "",
        candidateBalance: "",
    });
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [massaStationProvider, setMassaStationProvider] = useState<
        IProvider | undefined
    >(undefined);

    useEffect(() => {
        const registerAndSetProvider = async () => {
            registerEvent(MASSA_STATION, MASSA_WALLET_PROVIDER);
            const massaStationProvider = providers().find(
                (provider) => provider.name() === MASSA_STATION
            );
            setMassaStationProvider(massaStationProvider);
        };

        registerAndSetProvider();
    }, [massaStationProvider]);

    const setAccountInfo = async (account: IAccount) => {
        setAccount(account);
        setBalance(await fetchBalance(account));
    };

    const resetAccountInfo = async () => {
        setAccount(null);
        setBalance({ finalBalance: "0", candidateBalance: "0" });
    };

    const getFirstAccount = async () => {
        if (!massaStationProvider) {
            throw new Error(MASSA_STATION_NOT_RUNNING_ERROR);
        }
        const data = await massaStationProvider.accounts();
        if (data.length > 0) {
            return data[0];
        }
    };

    const connect = async () => {
        try {
            const firstAccount = await getFirstAccount();
            if (firstAccount) {
                setAccountInfo(firstAccount);
                setConnected(true);
                setErrorMessage("");
            } else {
                throw new Error(NO_ACCOUNT_ERROR);
            }
        } catch (e: any) {
            console.error("Error while connecting to Massa Station: ", e);
            resetAccountInfo();
            setConnected(false);
            setErrorMessage(e.message);
        }
    };

    const fetchBalance = async (account: IAccount) => {
        try {
            const balance = await account.balance();
            return balance;
        } catch (error) {
            console.error("Error while retrieving balance: ", error);
            return EMPTY_BALANCE;
        }
    };

    const createAccount = async (accountName: string) => {
        setErrorMessage("");
        try {
            if (!massaStationProvider) {
                throw new Error(MASSA_STATION_NOT_RUNNING_ERROR);
            }
            await massaStationProvider.generateNewAccount(accountName);
            const firstAccount = await getFirstAccount();
            if (firstAccount) {
                await setAccountInfo(firstAccount);
            } else {
                throw new Error(NO_ACCOUNT_ERROR);
            }
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    return {
        connected,
        balance,
        account,
        errorMessage,
        connect,
        createAccount,
    };
};

export default UseMassaStation;
