import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider"
import { ClientFactory, Args } from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = "AS1u8i5H1RQU5qD8R8hQzugA8HwWmS9qqyZNjhvR9WywUP17v1od";

function App() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [lastOpId, setlastOpId] = useState<string | null>(null);
    const [message, setMessage] = useState("Hello World");

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
                setErrorMessage("Please install massa station and the wallet plugin of Massa Labs and refresh.");
            }
        };

        registerAndSetProvider();
    }, []);

    const callHelloWorld = async () => {
        try {
            if (!account || !provider) {
                return;
            }
            let client = await ClientFactory.fromWalletProvider(provider, account);
            let op_id = await client.smartContracts().callSmartContract({
                targetAddress: CONTRACT_ADDRESS,
                functionName: "helloWorld",
                parameter: new Args().addString(message).serialize(),
                maxGas: BigInt(1000000),
                coins: BigInt(0),
                fee: BigInt(0),
            });
            setlastOpId(op_id);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="App theme-light">
            {errorMessage && <div>{errorMessage}</div>}
            {account && (
                <div>
                    <div>Address: {account.address()}</div>
                    <div>
                        <label>Message:  </label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} // mise à jour de l'état du message à chaque modification du champ d'entrée
                        />
                    </div>
                    <button className="button w-64" onClick={callHelloWorld}>Call {message}</button>
                    <div>Op id will be displayed few seconds after the transaction is sent</div>
                </div>
            )}
            {lastOpId && <div>Last Op id: {lastOpId}</div>}
        </div>
    );
}

export default App;
