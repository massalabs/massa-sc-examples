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
    const [massaStationProvider, setMassaStationProvider] =
        useState<IProvider | null>(null);

    useEffect(() => {
        const registerAndSetProvider = async () => {
            registerEvent(MASSA_STATION, MASSA_WALLET_PROVIDER);
            setMassaStationProvider(providers()[0]); // this is a massaStation object
        };

        registerAndSetProvider();
    }, []);

    async function getFirstAccount() {
        if (!massaStationProvider) {
            return null;
        }
        const data = await massaStationProvider.accounts();
        if (data.length > 0) {
            return data[0];
        }
    }

    // check if Massa Station is running with the wallet plugin
    async function connect(): Promise<void> {
        try {
            const firstAccount = await getFirstAccount();
            setConnected(true);
            if (firstAccount) {
                setAccountInfo(firstAccount);
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
    };
};

export default UseMassaStation;
