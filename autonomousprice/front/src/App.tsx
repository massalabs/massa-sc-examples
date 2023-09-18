import { useState, useEffect } from "react";
import { Args, IClient, ClientFactory, IEventFilter, Client, ISlot, ON_MASSA_EVENT_DATA, IEvent, EventPoller, ON_MASSA_EVENT_ERROR } from "@massalabs/massa-web3";
import { IAccount, providers } from "@massalabs/wallet-provider";

const MASSA_EXEC_ERROR = "massa_execution_error";
const MAX_GAS = BigInt(1000000);
const CONTRACT_ADDRESS = "AS12PyM4EZ2TptSoEHEbefz4b8sPbLudR2QsgeJ39Cj8f3fNchQd2";

export default function AutonomousPriceInteraction() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [client, setClient] = useState<Client | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);

    const [price, setPrice] = useState<string>("");
    const [op_id, setOpId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGlobal, setLoadingGlobal] = useState(true);

    useEffect(() => {
        async function registerAndSetProvider() {
            try {
                const allProviders = await providers(true, 10000);

                if (!allProviders || allProviders.length === 0) {
                    throw new Error("No providers available");
                }

                const massastationProvider = allProviders.find(provider => provider.name() === 'MASSASTATION');

                if (!massastationProvider) {
                    setErrorMessage("MASSASTATION provider not found");
                    return;
                }

                const accounts = await massastationProvider.accounts();
                if (accounts.length === 0) {
                    setErrorMessage("No accounts found");
                    return;
                }

                setAccount(accounts[0]);
                setClient(await ClientFactory.fromWalletProvider(massastationProvider, accounts[0]));
            } catch (e) {
                setErrorMessage("Please install Massa Station and the wallet plugin of Massa Labs and refresh.");
            } finally {
                setLoadingGlobal(false);
            }
        }

        registerAndSetProvider();
    }, []);

    const fetchPrice = async () => {
        try {
            if (!account || !client) return;

            const res = await client.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: CONTRACT_ADDRESS,
                targetFunction: "getPrice",
                parameter: new Args().addString('hi').serialize(),
            });

            const retrievedPrice = new Args(res.returnValue).nextI64();
            setPrice(retrievedPrice.toString());
        } catch (error) {
            setErrorMessage("Failed to fetch price.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const setRandomPrice = async () => {
        setLoading(true);
        try {
            if (!account || !client) return;

            let op_id = await client.smartContracts().callSmartContract({
                targetAddress: CONTRACT_ADDRESS,
                functionName: "updatePrice",
                parameter: new Args().addString('eee').serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(50),
                fee: BigInt(2),
            });
            setOpId(op_id);
            fetchEvents(client, { original_operation_id: op_id } as IEventFilter).then((_events) => {
                fetchPrice();
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            setErrorMessage("Failed to set random price.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    function fetchEvents(web3Client: Client, filter: IEventFilter, pollInterval?: number): Promise<Array<IEvent>> {
        return new Promise((resolve, reject) => {
            web3Client
                .publicApi()
                .getNodeStatus()
                .then((nodeStatusInfo) => {
                    if (!filter.start) {
                        const start = nodeStatusInfo.last_slot;
                        start.period = start.period - 1000;
                        filter.start = start;
                    }

                    if (!pollInterval) {
                        pollInterval = 1000;
                    }

                    const eventPoller = EventPoller.startEventsPolling(
                        filter,
                        pollInterval,
                        web3Client
                    );

                    eventPoller.on(ON_MASSA_EVENT_DATA, (events) => {
                        let errorEvents = events.filter((e: any) =>
                            e.data.includes(MASSA_EXEC_ERROR)
                        );
                        eventPoller.stopPolling();
                        if (errorEvents.length > 0) {
                            reject(errorEvents);
                        } else {
                            resolve(events);
                        }
                    });

                    eventPoller.on(ON_MASSA_EVENT_ERROR, (error) => {
                        eventPoller.stopPolling();
                        reject(error);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    if (loadingGlobal) {
        return (
            <div className="centered-content">
                <div className="spinner"></div>
            </div>
        );
    } else if (errorMessage) {
        return (
            <div className="centered-content">
                <div className="title">My Massa Application</div>
                <div className="mas-body">
                    <div className="text-red-500">{errorMessage}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="centered-content">
                <div className="title">Massa Autonomous Price</div>
                <div className="mas-body">
                    <h3>Price will be randomly changed by +/- 5% automatically</h3>

                    <div className="py-4">
                        <button id="btnSetRdm" onClick={setRandomPrice}>
                            Set Random Price
                        </button>
                        { (op_id && <span id="op" style={{marginLeft : 5}}>Op id = {op_id} </span>)}
                    </div>

                    <div className="py-4">
                        <button id="btnGetPrice" onClick={fetchPrice}>
                            Get Current Price
                        </button>
                    </div>

                    <div className="py-4">
                        {loading ? (
                            <div className="spinner"></div>
                        ) : (
                            price && <h4 id="price">Current Price: {price}</h4>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}  