import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers } from "@massalabs/wallet-provider"
import { Args } from "@massalabs/massa-web3";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const CONTRACT_ADDRESS = "AS1u8i5H1RQU5qD8R8hQzugA8HwWmS9qqyZNjhvR9WywUP17v1od";

function App() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [account, setAccount] = useState<IAccount | null>(null);
    const [lastEvent, setLastEvent] = useState<string | null>(null);

    useEffect(() => {
        const registerAndSetProvider = async () => {
        try {
            await sleep(1000);
           let accounts = await (await providers())[0].accounts();
            if (accounts.length == 0) {
                setErrorMessage("No accounts found");
                return;
            }
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
            let res = await account?.callSC(
                CONTRACT_ADDRESS,
                "helloWorld",
                new Args().addString("Hello World"),
                BigInt(1)
            );
            setLastEvent(res?.firstEvent.data);
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
                    <div>Event will be displayed few seconds after the transaction is sent</div>
                </div>
            )}
            {lastEvent && <div>Last Event: {lastEvent}</div>}
        </div>
    );
}

export default App;
