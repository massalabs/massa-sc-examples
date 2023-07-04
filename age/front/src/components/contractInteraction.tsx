import React, { ChangeEvent, useState } from "react";
import { changeAge, getAge } from "../utils/age";
import { IAccount } from "@massalabs/wallet-provider";

interface ContractInteractionProps {
    account: IAccount;
}

export default function ContractInteraction({
    account,
}: ContractInteractionProps) {
    const [name, setname] = useState<string>("");
    const [age, setage] = useState<number>(0);
    const [resultSet, setResultSet] = useState<string>("");
    const [resultGet, setResultGet] = useState<string>("");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setname(event.target.value);
    };

    const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setage(Number(event.target.value));
    };

    const handleSubmitSet = async () => {
        console.log("Handle sum transaction");
        const response = await changeAge(name, age);
        setResultSet(response);
    };

    const handleSubmitGet = async () => {
        console.log("Handle sum transaction");
        const response = await getAge(name);
        setResultGet(response);
    };

    return (
        <>
            <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
                <h3 className="">Set Age</h3>
                <div>
                    <h4 className="py-4">Enter name</h4>
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <h4 className="py-4">Enter age</h4>
                    <input
                        type="number"
                        className="input"
                        placeholder="Enter age"
                        value={age}
                        onChange={handleAgeChange}
                    />
                    <button className="button" onClick={handleSubmitSet}>
                        Set Name and Age in blockchain
                    </button>
                </div>
                {resultSet !== null && (
                    <div className="py-4">
                        <h4>Result: {resultSet}</h4>
                    </div>
                )}
            </div>
            <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
                <h3 className="">Get Age</h3>
                <div>
                    <h4 className="py-4">Enter name</h4>
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <button className="button" onClick={handleSubmitGet}>
                        Get Age in blockchain
                    </button>
                </div>
                {resultGet !== null && (
                    <div className="py-4">
                        <h4>Result: {resultGet}</h4>
                    </div>
                )}
            </div>
        </>
    );
}
