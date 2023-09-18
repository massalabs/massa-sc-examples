import { useState, useEffect } from "react";
import { Args, IClient, ClientFactory, utils, Client } from "@massalabs/massa-web3";
import { IAccount, providers } from "@massalabs/wallet-provider";
import pollAsyncEvents, { IEventPollerResult } from "./pollAsyncEvent";


const MAX_GAS = BigInt(1000000);
const CONTRACT_ADDRESS = "AS1zWJmf49TDrREj96h3XLcQxx3jf6hmPJqr1DN5t9XoFbvp3DN";

export default function AutonomousPriceInteraction() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [client, setClient] = useState<Client | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);

    const [price, setPrice] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGlobal, setLoadingGlobal] = useState(true);

    useEffect(() => {
        async function registerAndSetProvider() {
            try {
                const allProviders = await providers(true, 10000);

                if (!allProviders || allProviders.length === 0) {
                    throw new Error("No providers available");
                }

                const massastationProvider = allProviders.find(provider => provider.name() === 'MASSASTATION');

                if (!massastationProvider) {
                    setErrorMessage("MASSASTATION provider not found");
                    return;
                }

                const accounts = await massastationProvider.accounts();
                if (accounts.length === 0) {
                    setErrorMessage("No accounts found");
                    return;
                }
                console.log(accounts);
                setAccount(accounts[1]);
                // if (!account || !massastationProvider) {
                //     return;
                // }
                const client = await ClientFactory.fromWalletProvider(massastationProvider, accounts[1]);
                setClient(client);
            } catch (e) {
                setErrorMessage("Please install Massa Station and the wallet plugin of Massa Labs and refresh.");
            } finally {
                setLoadingGlobal(false);
            }
        }

        registerAndSetProvider();
    }, []);

    const fetchPrice = async () => {
        try {
            if (!account || !client) return;

            const res = await client.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: CONTRACT_ADDRESS,
                targetFunction: "getPrice",
                parameter: new Args().serialize(),
            });

            const retrievedPrice = new Args(res.returnValue).nextI64();
            setPrice(retrievedPrice.toString());
        } catch (error) {
            setErrorMessage("Failed to fetch price.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const setRandomPrice = async () => {
        setLoading(true);
        try {
            if (!account || !client) return;

            let op_id = await client.smartContracts().callSmartContract({
                targetAddress: CONTRACT_ADDRESS,
                functionName: "setPrice",
                parameter: new Args().addString('toto').serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(1),
                fee: BigInt(50),
            });

            const { isError, eventPoller, events }: IEventPollerResult = await utils.time.withTimeoutRejection<IEventPollerResult>(
                pollAsyncEvents(client, op_id),
                10000,
            );
            console.log(events);
            // await fetchPrice();
        } catch (error) {
            setErrorMessage("Failed to set random price.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loadingGlobal) {
        return (
            <div className="centered-content">
                <div className="spinner"></div>
            </div>
        );
    } else if (errorMessage) {
        return (
            <div className="centered-content">
                <div className="title">My Massa Application</div>
                <div className="mas-body">
                    <div className="text-red-500">{errorMessage}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="centered-content">
                <div className="title">Massa Autonomous Price</div>
                <div className="mas-body">
                    <h3>Price will be randomly changed by +/- 5% automatically</h3>

                    <div className="py-4">
                        <button onClick={setRandomPrice}>
                            Set Random Price
                        </button>
                    </div>

                    <div className="py-4">
                        <button onClick={fetchPrice}>
                            Get Current Price
                        </button>
                    </div>

                    <div className="py-4">
                        {loading ? (
                            <div className="spinner"></div>
                        ) : (
                            price && <h4>Current Price: {price}</h4>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}  