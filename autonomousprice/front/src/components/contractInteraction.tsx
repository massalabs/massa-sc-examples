import React, { useState, useEffect } from "react";
import { Args, IClient, ClientFactory } from "@massalabs/massa-web3";
import { IAccount, providers } from "@massalabs/wallet-provider";
import Loader from "./Loader";

const MAX_GAS = BigInt(1000000);
const CONTRACT_ADDRESS = "AS12tdw4onaZqFkSTHqSFWaJZxSQST2EWU7xQoXmFETDkSEiZPLjs";

export default function AutonomousPriceInteraction() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [client, setClient] = useState<IClient | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);

    const [price, setPrice] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGlobal, setLoadingGlobal] = useState(true);

    useEffect(() => {
        async function registerAndSetProvider() {
            try {
                const allProviders = await providers(true, 10000);
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

                setAccount(accounts[0]);
                if (!account || !massastationProvider) {
                    return;
                }
                setClient(await ClientFactory.fromWalletProvider(massastationProvider, account));
            } catch (e) {
                setErrorMessage("Please install Massa Station and the wallet plugin of Massa Labs and refresh.");
            } finally {
                setLoadingGlobal(false);
            }
        }

        registerAndSetProvider();
    }, [account]);

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

            await client.smartContracts().callSmartContract({
                targetAddress: CONTRACT_ADDRESS,
                functionName: "setPrice",
                parameter: new Args().serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(1),
                fee: BigInt(0),
            });

            await fetchPrice();
        } catch (error) {
            setErrorMessage("Failed to set random price.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loadingGlobal) {
        return <Loader />;
    } else if (errorMessage) {
        return (
            <div className="relative bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-5xl p-8 box-border rounded-lg shadow-md mb-12 mx-auto">
                <div className="text-red-500">{errorMessage}</div>
            </div>
        );
    } else {
        return (
            <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border rounded-lg shadow-md mb-12 mx-auto">
                <h3 className="">Price will be randomly changed by +/- 5% automatically</h3>
                
                <div className="py-4">
                    <button
                        className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white disabled:bg-secondary"
                        onClick={setRandomPrice}
                        
                    >
                        Set Random Price
                    </button>
                </div>

                <div className="py-4">
                <button
                className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white"
                        onClick={fetchPrice}
                                    >
                 Get Current Price
                </button>
                </div>

                {price && (
                    <div className="py-4">
                    {loading ? (
                        <Loader />
                    ) : (
                        price && <h4>Current Price: {price}</h4>
                    )}
                </div>
                )}
            </div>
        );
    }
}