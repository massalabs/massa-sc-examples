import { useState, useEffect } from "react";
import { IAccount, IProvider, providers } from "@massalabs/wallet-provider";

const registerEvent = (name: string, id: string) => {
    const registerEvent = new CustomEvent("register", {
        detail: { providerName: name },
    });
    const element = document.getElementById(id);
    if (element) {
        element.dispatchEvent(registerEvent);
    }
};

const UseMassaStation = () => {
    const [connected, setConnected] = useState<boolean>(false);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [balance, setBalance] = useState<{ finalBalance: number }>({
        finalBalance: 0,
    });
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [massaStationProvider, setMassaStationProvider] =
        useState<IProvider | null>();

    useEffect(() => {
        registerEvent("MASSASTATION", "massaWalletProvider");
        setMassaStationProvider(providers()[0]); // this is a massaStation object
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
    async function connectMassaStation() {
        try {
            const firstAccount = await getFirstAccount();
            if (firstAccount) {
                setAccountInfo(firstAccount);
                setConnected(true);
                console.log("Connected to Massa Station");
            } else {
                throw new Error("No account found");
            }
        } catch (error) {
            console.log("Error while connecting to Massa Station: ", error);
            resetAccountInfo();
            setConnected(false);
            setErrorMessage(
                "Massa Station is not running or the wallet plugin is not installed."
            );
        }
    }

    async function fetchBalance(account: IAccount) {
        try {
            const balance = await account.balance();
            return Number(balance);
        } catch (error) {
            console.log("Error while retrieving balance: ", error);
            return 0;
        }
    }

    async function createAccount() {
        // empty the message
        setErrorMessage("");

        try {
            if (!massaStationProvider) {
                return Error(
                    "Massa Station is not running or the wallet plugin is not installed."
                );
            }
            await massaStationProvider.generateNewAccount(
                (
                    document.getElementsByClassName(
                        "input"
                    )[0] as HTMLInputElement
                ).value
            );
            const firstAccount = await getFirstAccount();
            if (firstAccount) {
                setAccountInfo(firstAccount);
            } else {
                throw new Error("No account found");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error);
            return;
        }
    }

    async function setAccountInfo(account: IAccount) {
        setAccount(account);
        setBalance({ finalBalance: await fetchBalance(account) });
    }

    function resetAccountInfo() {
        setAccount(null);
        setBalance({ finalBalance: 0 });
    }

    return {
        connected,
        balance,
        account,
        errorMessage,
        connectMassaStation,
        createAccount,
    };
};

export default UseMassaStation;
