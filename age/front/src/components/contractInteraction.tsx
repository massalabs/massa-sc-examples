import React, { ChangeEvent, useState } from "react";
import { changeAge, getAge } from "../utils/age";
import { IAccount } from "@massalabs/wallet-provider";

interface ContractInteractionProps {
    account: IAccount;
}

export default function ContractInteraction({
    account,
}: ContractInteractionProps) {
    const [nameSet, setNameSet] = useState<string>("");
    const [nameGet, setNameGet] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [resultSet, setResultSet] = useState<string>("");
    const [resultGet, setResultGet] = useState<string>("");

    const handleNameSetChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameSet(event.target.value);
    };

    const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAge(Number(event.target.value));
    };

    const handleNameGetChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameGet(event.target.value);
    };

    const handleSubmitSet = async () => {
        console.log("Handle sum transaction");
        const response = await changeAge(nameSet, age);
        setResultSet(response);
    };

    const handleSubmitGet = async () => {
        console.log("Handle sum transaction");
        const response = await getAge(nameGet);
        setResultGet(response);
    };

    return (
        <div className="flex gap-10">
            <div className="bg-secondary mas-body flex-col items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
                <h3 className=" font-bold text-2xl">Set Age</h3>
                <div>
                    <h4 className="py-4">Enter name</h4>
                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter name"
                            value={nameSet}
                            onChange={handleNameSetChange}
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
            </div>
            <div className="bg-secondary mas-body flex flex-col items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
                <h3 className="font-bold text-2xl">Get Age</h3>
                <div>
                    <h4 className="py-4">Enter name</h4>
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter name"
                        value={nameGet}
                        onChange={handleNameGetChange}
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
        </div>
    );
}
