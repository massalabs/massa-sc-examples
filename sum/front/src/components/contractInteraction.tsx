import React, { ChangeEvent, useState } from "react";
import { sum } from "../utils/sumCaller";
import { IAccount } from "@massalabs/wallet-provider";

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
        const response = await sum(BigInt(num1), BigInt(num2), 0n);
        // setResult(response);
        console.log(response);
    };

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
                <button className="button" onClick={handleSubmit}>
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
