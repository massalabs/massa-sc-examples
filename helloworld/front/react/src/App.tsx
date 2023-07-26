import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers } from "@massalabs/wallet-provider"
import { ClientFactory } from "@massalabs/massa-web3";
import { Args } from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = "AS1u8i5H1RQU5qD8R8hQzugA8HwWmS9qqyZNjhvR9WywUP17v1od";

function App() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [nodeUrls, setNodeUrls] = useState<string[] | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [lastOpId, setlastOpId] = useState<string | null>(null);

    useEffect(() => {
        const registerAndSetProvider = async () => {
        try {
           let provider = (await providers(true, 10000))[0];
           let accounts = await provider.accounts();
            if (accounts.length == 0) {
                setErrorMessage("No accounts found");
                return;
            }
            setAccount(accounts[0]);
            setNodeUrls(await provider.getNodesUrls());
        } catch (e) {
            console.log(e);
            setErrorMessage("Please install massa station and the wallet plugin of Massa Labs and refresh.");
        }
        };

        registerAndSetProvider();
    }, []);

    const callHelloWorld = async () => {
        try {
            if (!nodeUrls || !account) {
                return;
            }
            let client = await ClientFactory.createClientFromWalletProvider(nodeUrls, account);
            let op_id = await client.smartContracts().callSmartContract({
                targetAddress: CONTRACT_ADDRESS,
                functionName: "helloWorld",
                parameter: new Args().addString("Hello World").serialize(),
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
                    <button className="button w-64" onClick={callHelloWorld}>Call Hello World</button>
                    <div>Op id will be displayed few seconds after the transaction is sent</div>
                </div>
            )}
            {lastOpId && <div>Last Op id: {lastOpId}</div>}
        </div>
    );
}

export default App;
