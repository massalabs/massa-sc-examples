import React, { useEffect, useState } from "react";
import {
    getPrice,
    setPrice,
    getCurrentPrice,
} from "../utils/autonomouspriceCaller";
import { IAccount } from "@massalabs/wallet-provider";

interface ContractInteractionProps {
    account: IAccount;
}

export default function ContractInteraction({
    account,
}: ContractInteractionProps) {
    const [currentPrice, setCurrentPrice] = useState<string>("");
    const [resultGet, setResultGet] = useState<string>("");
    const [resultSet, setResultSet] = useState<string>("");

    const handleGet = async () => {
        console.log("Handle autonomousprice Get transaction");
        const response = await getPrice();
        setResultGet(response);
    };

    const handleSet = async () => {
        console.log("Handle autonomousprice Set transaction");
        const response = await setPrice();
        setResultSet(response);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCurrentPrice();
                setCurrentPrice(response); // Assuming the API response has a 'data' property
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const interval = setInterval(fetchData, 1000); // Run the fetchData function every 1 second

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
            <h3 className="p-8">Manage Autonomousprice</h3>
            <h4 className="">Current price : </h4>
            {currentPrice !== null && (
                <div className="">
                    <h4>{currentPrice}</h4>
                </div>
            )}
            <div className="mt-6">
                <button className="button" onClick={handleGet}>
                    Get price
                </button>
            </div>
            {resultGet !== null && (
                <div className="py-4">
                    <h4>Result: {resultGet}</h4>
                </div>
            )}

            <div>
                <button className="button" onClick={handleSet}>
                    Set price
                </button>
            </div>
            {resultSet !== null && (
                <div className="py-4">
                    <h4>Result: {resultSet}</h4>
                </div>
            )}
        </div>
    );
}
