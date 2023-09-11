import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider";
import { ClientFactory, Args } from "@massalabs/massa-web3";
import pollAsyncEvents from "./pollAsyncEvent";

const CONTRACT_ADDRESS = "AS1u8i5H1RQU5qD8R8hQzugA8HwWmS9qqyZNjhvR9WywUP17v1od";

function App() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [lastOpId, setLastOpId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const registerAndSetProvider = async () => {
            try {
                let provider = (await providers(true, 10000))[0];
                let accounts = await provider.accounts();
                if (accounts.length === 0) {
                    setErrorMessage("No accounts found");
                    return;
                }
                setProvider(provider);
                setAccount(accounts[0]);
            } catch (e) {
                console.log(e);
                setErrorMessage(
                    "Please install massa station and the wallet plugin of Massa Labs and refresh."
                );
            }
        };

        registerAndSetProvider();
    }, []);

    const callHelloWorld = async () => {
        try {
            if (!account || !provider) {
                return;
            }
            let client = await ClientFactory.fromWalletProvider(
                provider,
                account
            );
            let op_id = await client.smartContracts().callSmartContract({
                targetAddress: CONTRACT_ADDRESS,
                functionName: "helloWorld",
                parameter: new Args().addString("Hello World").serialize(),
                maxGas: BigInt(1000000),
                coins: BigInt(0),
                fee: BigInt(0),
            });
            setLastOpId(op_id);
            const result = await pollAsyncEvents(client, op_id);
            const message = result.events[0].data;
            setMessage(message);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="App theme-light">
            {errorMessage && <div>{errorMessage}</div>}
            {account && (
                <div className="flex flex-col gap-4 justify-center items-center mt-4">
                    <p className=" text-lg  rounded-full border p-3 px-5">
                        Address: {account.address()}
                    </p>
                    <button
                        id="callHelloWorld"
                        className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded active:bg-slate-800 "
                        onClick={callHelloWorld}
                    >
                        Call Hello World
                    </button>

                    {lastOpId ? (
                        <p>Last Op id: {lastOpId}</p>
                    ) : (
                        <p>
                            Op id will be displayed few seconds after the
                            transaction is sent
                        </p>
                    )}
                    {message && <p>Message: {message}</p>}
                </div>
            )}
        </div>
    );
}

export default App;
