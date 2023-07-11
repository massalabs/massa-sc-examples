import { ChangeEvent, useState } from "react";
import { IAccount } from "@massalabs/wallet-provider";
import { Args } from "@massalabs/massa-web3";
import Loader from "../ui/Loader";

const CONTRACT_ADDRESS =
    "AS12YrZxFisWZCKJpXLEYfSYzrSCS4bjoyKGeaviQMmb5zqfgXaML";

interface ContractInteractionProps {
    account: IAccount;
}

export default function ContractInteraction({
    account,
}: ContractInteractionProps) {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleNum1Change = (event: ChangeEvent<HTMLInputElement>) => {
        setNum1(Number(event.target.value));
    };

    const handleNum2Change = (event: ChangeEvent<HTMLInputElement>) => {
        setNum2(Number(event.target.value));
    };

    const calculateSum = async () => {
        setLoading(true);
        try {
            await account.callSC(
                CONTRACT_ADDRESS,
                "sum",
                new Args().addI64(BigInt(num1)).addI64(BigInt(num2)),
                BigInt(100),
                { isNPE: false, maxGas: BigInt(1000000) }
            );

            setResult((await getLastResult()).toString());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getLastResult = async () => {
        const result = await account.callSC(
            CONTRACT_ADDRESS,
            "lastResult",
            new Uint8Array([]),
            BigInt(0),
            { isNPE: true, maxGas: BigInt(1000000) }
        );

        return new Args(result.returnValue).nextI64();
    };

    return (
        <div className="bg-secondary border mas-body flex flex-col justify-center items-center w-1/4 max-w-lg p-8 box-border rounded-lg shadow-md mb-12">
            <h3 className="font-bold text-lg">Manage Sum Transactions</h3>
            <h4 className="py-4">Enter Numbers</h4>
            <div className="flex justify-center items-center gap-2 mb-4">
                <input
                    type="number"
                    className="input m-0"
                    placeholder="Enter number 1"
                    value={num1}
                    onChange={handleNum1Change}
                />
                +
                <input
                    type="number"
                    className="input"
                    placeholder="Enter number 2"
                    value={num2}
                    onChange={handleNum2Change}
                />
            </div>
            <button
                className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white disabled:bg-secondary"
                onClick={calculateSum}
                disabled={loading}
            >
                {!loading ? <div>Calculate Sum</div> : <Loader />}
            </button>

            {result && (
                <div className="py-4">
                    <h4>Result: {result}</h4>
                </div>
            )}
        </div>
    );
}
