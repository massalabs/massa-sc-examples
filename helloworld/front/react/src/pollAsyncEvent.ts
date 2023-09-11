import {
    EventPoller,
    Client,
    INodeStatus,
    IEventFilter,
    ON_MASSA_EVENT_DATA,
    ON_MASSA_EVENT_ERROR,
    IEvent,
} from "@massalabs/massa-web3";

interface IEventPollerResult {
    isError: boolean;
    eventPoller: EventPoller;
    events: IEvent[];
}

const MASSA_EXEC_ERROR = "massa_execution_error";
const PERIOD_OFFSET = 1000;
const POLLING_INTERVAL = 1000;

const getStartPeriod = (nodeStatusInfo: INodeStatus | null | undefined) => {
    if (!nodeStatusInfo || !nodeStatusInfo.last_slot) {
        throw new Error("Failed to retrieve node status information");
    }

    const start = nodeStatusInfo.last_slot;
    start.period -= PERIOD_OFFSET;

    return start;
};

const createEventFilter = (start: any, opId: string): IEventFilter => ({
    start,
    end: null,
    original_caller_address: null,
    original_operation_id: opId,
    emitter_address: null,
    is_final: false,
});

const pollAsyncEvents = async (
    web3Client: Client,
    opId: string
): Promise<IEventPollerResult> => {
    let nodeStatusInfo: INodeStatus | null | undefined;

    try {
        nodeStatusInfo = await web3Client.publicApi().getNodeStatus();
    } catch (error) {
        console.error("Error fetching node status:", error);
        throw error;
    }

    const start = getStartPeriod(nodeStatusInfo);
    const eventsFilter = createEventFilter(start, opId);

    const eventPoller = EventPoller.startEventsPolling(
        eventsFilter,
        POLLING_INTERVAL,
        web3Client
    );

    return new Promise((resolve, reject) => {
        eventPoller.on(ON_MASSA_EVENT_DATA, (events: Array<IEvent>) => {
            const errorEvents = events.filter((e) =>
                e.data.includes(MASSA_EXEC_ERROR)
            );

            if (errorEvents.length > 0) {
                return resolve({
                    isError: true,
                    eventPoller,
                    events: errorEvents,
                });
            }

            if (events.length) {
                return resolve({ isError: false, eventPoller, events });
            } else {
                console.log("No events have been emitted during deployment");
            }
        });

        eventPoller.on(ON_MASSA_EVENT_ERROR, (error: Error) => {
            console.error("Event Data Error:", error);
            return reject(error);
        });
    });
};

export default pollAsyncEvents;
