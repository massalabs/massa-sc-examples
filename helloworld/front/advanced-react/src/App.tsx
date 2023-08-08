import "./App.css";
import "@massalabs/react-ui-kit/src/global.css";
import { useEffect, useState } from "react";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider"
import { ClientFactory, Args, Client, EventPoller, IEvent, IEventFilter, INodeStatus, ON_MASSA_EVENT_DATA, ON_MASSA_EVENT_ERROR, EOperationStatus, ISlot } from "@massalabs/massa-web3";
import { withTimeoutRejection } from "@massalabs/massa-web3/dist/esm/utils/time";

const CONTRACT_ADDRESS = "AS1u8i5H1RQU5qD8R8hQzugA8HwWmS9qqyZNjhvR9WywUP17v1od";
const MASSA_EXEC_ERROR = 'massa_execution_error';

function App() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [lastOpId, setlastOpId] = useState<string | null>(null);
    const [message, setMessage] = useState("Hello World");
    const [fetchedMessage, setFetchedMessage] = useState<string | null>(null);
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null);


    interface IEventPollerResult {
        isError: boolean;
        eventPoller: EventPoller;
        events: IEvent[];
    }

    const pollAsyncEvents = async (
        client: Client,
        opId: string,
        lastSlot?: ISlot,
    ): Promise<IEventPollerResult> => {
        // set the events filter, here we will find event thanks to the opId
        const eventsFilter = {
            start: lastSlot ? lastSlot : 0,
            end: null,
            original_caller_address: null,
            original_operation_id: opId,
            emitter_address: null,
            is_final: false,
        } as IEventFilter;

        console.log('Event Filter:', eventsFilter)

        const eventPoller = EventPoller.startEventsPolling(
            eventsFilter,
            1000,       // polling interval in ms
            client,
        );

        return new Promise((resolve, reject) => {
            eventPoller.on(ON_MASSA_EVENT_DATA, (events: Array<IEvent>) => {
                console.log('Event Data Received:', events);
                // check if there is an error event
                let errorEvents: IEvent[] = events.filter((e) =>
                    e.data.includes(MASSA_EXEC_ERROR),
                );
                if (errorEvents.length > 0) {
                    return resolve({
                        isError: true,
                        eventPoller,
                        events: errorEvents,
                    } as IEventPollerResult);
                }

                // check if there is a success event
                if (events.length) {
                    return resolve({
                        isError: false,
                        eventPoller,
                        events,
                    } as IEventPollerResult);
                } else {
                    console.log('No events have been emitted');
                }
            });
            eventPoller.on(ON_MASSA_EVENT_ERROR, (error: Error) => {
                console.log('Event Data Error:', error);
                return reject(error);
            });
        });
    };

    async function awaitTxConfirmation(
        web3Client: Client,
        deploymentOperationId: string,
    ): Promise<void> {
        console.log(`Awaiting  FINAL transaction status....`);
        let status: EOperationStatus;
        try {
            status = await web3Client
                .smartContracts()
                .awaitRequiredOperationStatus(
                    deploymentOperationId,
                    EOperationStatus.FINAL,
                );
            console.log(
                `Transaction with Operation ID ${deploymentOperationId} has reached finality!`);
        } catch (ex) {
            throw new Error(`Error getting finality of transaction ${deploymentOperationId}`);
        }

        if (status !== EOperationStatus.FINAL) {
            throw new Error(`Transaction ${deploymentOperationId} did not reach finality after 
            considerable amount of time.`);
        }
    }

    useEffect(() => {
        const registerAndSetProvider = async () => {
            try {
                let provider = (await providers(true, 10000))[0];
                let accounts = await provider.accounts();
                if (accounts.length === 0) {
                    setErrorMessage("No accounts found");
                    return;
                }
                setProvider(provider);
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
            if (!account || !provider) {
                return;
            }
            let client = await ClientFactory.fromWalletProvider(provider, account);

            // get node status so we can determine the last slot to start polling from
            let lastSlot: ISlot = (await client
                .publicApi()
                .getNodeStatus()).last_slot;
            let op_id = await client.smartContracts().callSmartContract({
                targetAddress: CONTRACT_ADDRESS,
                functionName: "helloWorld",
                parameter: new Args().addString(message).serialize(),
                maxGas: BigInt(1000000),
                coins: BigInt(0),
                fee: BigInt(0),
            });
            setlastOpId(op_id);
            setTransactionStatus("Transaction sent");
            console.log("Starting to poll events...")
            // async poll events in the background for the given opId
            const { isError, eventPoller, events }: IEventPollerResult =
                await withTimeoutRejection<IEventPollerResult>(
                    pollAsyncEvents(client, op_id, lastSlot),
                    20000,
                );

            // stop polling
            eventPoller.stopPolling();

            // if errors, don't await finalization
            if (isError) {
                throw new Error(
                    `Massa Deployment Error: ${JSON.stringify(events, null, 4)} `,
                );
            }
            const data = events[0].data;
            console.log("Message fetched: ", data);
            setFetchedMessage(data);

            // await finalization
            await awaitTxConfirmation(client, op_id);
            console.log("Transaction confirmed");

            setTransactionStatus("Transaction confirmed");

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
                    <div>
                        <label>Message:  </label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button className="button w-64" onClick={callHelloWorld}>Call {message}</button>
                    {lastOpId ? <div>Op id: {lastOpId}</div>
                        : <div>Op id will be displayed few seconds after the transaction is sent</div>}
                </div>
            )}
            {transactionStatus && <div>Transaction status: {transactionStatus}</div>}
            {fetchedMessage && <div>Fetched message: {fetchedMessage}</div>}
        </div>
    );
}

export default App;
