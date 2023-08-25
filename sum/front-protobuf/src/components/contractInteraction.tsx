import { ChangeEvent, useState, useEffect } from "react";
import { Args, IClient, ClientFactory, WalletClient, IProvider, IClientConfig, PublicApiClient, Web3Account } from "@massalabs/massa-web3";
import { IAccount, providers } from "@massalabs/wallet-provider";
import Loader from "./Loader";
import { OperationOutputs, Ru1v2WbjYYBlockchainCaller } from "../helpers/Ru1v2WbjYYCaller";

export default function ContractInteraction() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [caller, setCaller] = useState<Ru1v2WbjYYBlockchainCaller | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);

    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGlobal, setLoadingGlobal] = useState(false);
    const [providerUsed, setProviderUsed] = useState<string>("");

    const initializeProvider = async (targetProviderName: string) => {
        const allProviders = await providers(true, 10000);

        if (!allProviders || allProviders.length === 0) {
            throw new Error("No providers available");
        }

        const targetProvider = allProviders.find(provider => provider.name() === targetProviderName);
        if (!targetProvider) {
            throw new Error(`${targetProviderName} provider not found`);
        }

        setProviderUsed(targetProviderName);

        const accounts = await targetProvider.accounts();
        if (accounts.length === 0) {
            throw new Error("No accounts found");
        }

        setAccount(accounts[0]);
        const client = await ClientFactory.fromWalletProvider(targetProvider, accounts[0]);
        setCaller(await Ru1v2WbjYYBlockchainCaller.newDefault(client.wallet()));
    };

    useEffect(() => {
        const bootstrap = async () => {
            try {
                await initializeProvider('MASSASTATION');
            } catch (e) {
                console.log(e);
                try {
                    await initializeProvider('BEARBY');
                } catch (e) {
                    setErrorMessage("Please install massa station and the wallet plugin of Massa Labs and refresh.");
                } finally {
                    setLoadingGlobal(false);
                }
            }
        };
        bootstrap();
    }, []);

    const switchProvider = async () => {
        setLoading(true);
        try {
            console.log("switching provider");
            const nextProvider = providerUsed === "MASSASTATION" ? "BEARBY" : "MASSASTATION";
            const allProviders = await providers(true, 5000);
            console.log("allProviders: ", allProviders);
            const nextProviderFound = allProviders.find(provider => provider.name() === nextProvider);
            if (!nextProviderFound) {
                console.error("next provider not found");
                setLoading(false);
                return;
            }
            await initializeProvider(nextProvider);
            console.log("switched to " + nextProvider);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };



    const handleNum1Change = (event: ChangeEvent<HTMLInputElement>) => {
        setNum1(Number(event.target.value));
    };

    const handleNum2Change = (event: ChangeEvent<HTMLInputElement>) => {
        setNum2(Number(event.target.value));
    };

    const calculateSum = async () => {
        setLoading(true);
        try {
            setTimeout(async () => {
                if (!account || !caller) {
                    return;
                }
                const outputs: OperationOutputs = await caller.sum(
                    BigInt(num1),
                    BigInt(num2),
                    100000000n,
                );
                setResult(outputs.outputs? outputs.outputs : "[]");
                setLoading(false);
            }, 0);
        } catch (error) {
            console.error(error);
        }
    };

    // const getLastResult = async () => {
    //     setLoading(true);
    //     if (!account || !caller) {
    //         return BigInt(0);
    //     }
    //     let res = await caller.smartContracts().readSmartContract({
    //         maxGas: MAX_GAS,
    //         targetAddress: CONTRACT_ADDRESS,
    //         targetFunction: "lastResult",
    //         parameter: new Args().serialize(),
    //     });
    //     return new Args(res.returnValue).nextI64();
    // }


    if (loadingGlobal) {
        return <Loader />;
    }
    else if (errorMessage) {
        return (
            <div className="relative bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-5xl p-8 box-border rounded-lg shadow-md mb-12 mx-auto">
                <div className="text-red-500">{errorMessage}</div>
            </div>
        );
    }
    else {
        return (
            <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border rounded-lg shadow-md mb-12 mx-auto">
                <h3 className="">Manage Sum Transactions</h3>
                <button className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white disabled:bg-secondary" onClick={switchProvider} disabled={loading}>
                    {!loading ? <div>Switch Provider</div> : <Loader />}
                </button>

                <div>
                    <h4 className="py-4">Enter Numbers</h4>
                    <input
                        type="number"
                        className="input"
                        placeholder="Enter number 1"
                        value={num1}
                        onChange={handleNum1Change}
                    />
                    <input
                        type="number"
                        className="input"
                        placeholder="Enter number 2"
                        value={num2}
                        onChange={handleNum2Change}
                    />
                    <button
                        className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white disabled:bg-secondary"
                        onClick={calculateSum}
                        disabled={loading}
                    >
                        {!loading ? <div>Calculate Sum</div> : <Loader />}
                    </button>
                </div>
                {result && (
                    <div className="py-4">
                        <h4>Result: {result}</h4>
                    </div>
                )}
            </div>
        );
    }
}
