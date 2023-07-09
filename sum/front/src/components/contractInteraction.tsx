import { ChangeEvent, useState } from "react";
import { sum } from "../utils/sumCaller";
import { IAccount } from "@massalabs/wallet-provider";
import { Args } from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "";

interface ContractInteractionProps {
    account: IAccount;
}

export default function ContractInteraction({
    account,
}: ContractInteractionProps) {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [result, setResult] = useState<string>("");

    const handleNum1Change = (event: ChangeEvent<HTMLInputElement>) => {
        setNum1(Number(event.target.value));
    };

    const handleNum2Change = (event: ChangeEvent<HTMLInputElement>) => {
        setNum2(Number(event.target.value));
    };

    const handleSubmit = async () => {
        console.log("Handle sum transaction");
        const response = await sum(num1, num2, 0);
        setResult(response);
    };

    const calculateSum = async () => {
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

        console.log(new Args(result.returnValue).nextI64());

        return new Args(result.returnValue).nextI64();
    };

    if (!CONTRACT_ADDRESS) {
        return (
            // error message if contract address is not set
            <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
                <h3 className="">Manage Sum Transactions</h3>
                <div>
                    <h4 className="py-4">
                        Please set the contract address in the .env file
                    </h4>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
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
                <button className="button" onClick={calculateSum}>
                    Calculate Sum
                </button>
            </div>

            {result !== null && (
                <div className="py-4">
                    <h4>Result: {result}</h4>
                </div>
            )}
        </div>
    );
}
