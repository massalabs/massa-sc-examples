import React, { useState } from "react";
import { sum } from "../utils/sumCaller.ts";

/**
 * In this file we allow the user can: interact with a contract we deployed
 */

// first we need to set the default contract address in the .env.example file

export default function ContractInteraction(account) {
    /** here we need to set the inputs of the contract (for instance, in the sum contract we need to set the two numbers to sum and a button to send the transaction)
     * we can also :
     *  - send a transaction to the contract
     *  - listen to events emitted by the contract
     *  - read the state of the contract
     *  - etc.
     */

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState(null);

    const handleNum1Change = (event) => {
        setNum1(event.target.value);
    };

    const handleNum2Change = (event) => {
        setNum2(event.target.value);
    };

    const handleSubmit = async () => {
        console.log("Handle sum transaction");
        const response = await sum(num1, num2, 0);
        setResult(response);
    };

    return (
        <div className="contractInteraction bodyText">
            <h3 className="contractTitle">Manage Sum Transactions</h3>
            <div className="wrapperCall">
                <h4 className="callFunctionName">Enter Numbers</h4>
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
                <div className="result">
                    <h4>Result: {result}</h4>
                </div>
            )}
        </div>
    );
}