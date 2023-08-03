import { ChangeEvent, useState, useEffect } from "react";
import { Args, IClient, ClientFactory } from "@massalabs/massa-web3";
import { IAccount, providers } from "@massalabs/wallet-provider";
import Loader from "./Loader";

const MAX_GAS = BigInt(1000000);
const CONTRACT_ADDRESS =
    "AS12YrZxFisWZCKJpXLEYfSYzrSCS4bjoyKGeaviQMmb5zqfgXaML";

export default function ContractInteraction() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [client, setClient] = useState<IClient | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);

    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGlobal, setLoadingGlobal] = useState(true);

    useEffect(() => {
        const registerAndSetProvider = async () => {
          try {
            let provider = (await providers(true, 10000))[0];
            let accounts = await provider.accounts();
            if (accounts.length === 0) {
              setErrorMessage("No accounts found");
              return;
            }
            setAccount(accounts[0]);
            if (!account || !provider) {
              return;
            }
            setClient(await ClientFactory.fromWalletProvider(provider, account));
          } catch (e) {
            console.log(e);
            setErrorMessage("Please install massa station and the wallet plugin of Massa Labs and refresh.");
          }
          finally {
            setLoadingGlobal(false);
        }
        };
    
        registerAndSetProvider();
      }, [account]);


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
                let call = await client.smartContracts().callSmartContract({
                    targetAddress: CONTRACT_ADDRESS,
                    functionName: "sum",
                    parameter: new Args().addI64(BigInt(num1)).addI64(BigInt(num2)).serialize(),
                    maxGas: MAX_GAS,
                    coins: BigInt(1),
                    fee: BigInt(0),
                }); 
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
