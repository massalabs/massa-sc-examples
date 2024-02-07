import { ChangeEvent, useState, useEffect } from "react";
import { Args, IClient, ClientFactory } from "@massalabs/massa-web3";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider";
import Loader from "./Loader";

const MAX_GAS = BigInt(1000000);
const CONTRACT_ADDRESS =
    "AS1zizBjrZHbaMjCFFaxuJY2MCuvUMxogSxFk9Ao6sqkSv6wDgkk";

export default function ContractInteraction() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [client, setClient] = useState<IClient | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);

    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGlobal, setLoadingGlobal] = useState(true);
    const [providerUsed, setProviderUsed] = useState<string>("");

    const initializeProvider = async (targetProviderName: string) => {
        const allProviders = await providers();

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
        setClient(await ClientFactory.fromWalletProvider(targetProvider, accounts[0]));
    };

    useEffect(() => {
        const bootstrap = async () => {
            try {
                await initializeProvider('MASSASTATION');
                setLoadingGlobal(false);
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
            const nextProvider = providerUsed === "MASSASTATION" ? "BEARBY" : "MASSASTATION";
            const allProviders = await providers();
            const nextProviderFound = allProviders.find(provider => provider.name() === nextProvider);
            if (!nextProviderFound) {
                return;
            }
            await initializeProvider(nextProvider);
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
                if (!account || !client) {
                    return;
                }
                const opId = await client.smartContracts().callSmartContract({
                    targetAddress: CONTRACT_ADDRESS,
                    functionName: "sum",
                    parameter: new Args().addI64(BigInt(num1)).addI64(BigInt(num2)).serialize(),
                    maxGas: MAX_GAS,
                    coins: BigInt(1),
                    fee: BigInt(0),
                });
                console.log("opId: ", opId);
                setResult((await getLastResult()).toString());
                setLoading(false);
            }, 0);
        } catch (error) {
            console.error(error);
        }
    };

    const getLastResult = async () => {
        setLoading(true);
        if (!account || !client) {
            return BigInt(0);
        }
        let res = await client.smartContracts().readSmartContract({
            maxGas: MAX_GAS,
            targetAddress: CONTRACT_ADDRESS,
            targetFunction: "lastResult",
            parameter: new Args().serialize(),
        });
        return new Args(res.returnValue).nextI64();
    }


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
                        id="number1"
                        className="input"
                        placeholder="Enter number 1"
                        value={num1}
                        onChange={handleNum1Change}
                    />
                    <input
                        type="number"
                        id="number2"
                        className="input"
                        placeholder="Enter number 2"
                        value={num2}
                        onChange={handleNum2Change}
                    />
                    <button
                        id="calculateSumBtn"
                        className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white disabled:bg-secondary"
                        onClick={calculateSum}
                        disabled={loading}
                    >
                        {!loading ? <div>Calculate Sum</div> : <Loader />}
                    </button>
                </div>
                {result && (
                    <div className="py-4">
                        <h4 id="result">Result: {result}</h4>
                    </div>
                )}
            </div>
        );
    }
}
