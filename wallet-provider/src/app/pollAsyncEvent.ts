import {
  EventPoller,
  Client,
  INodeStatus,
  IEventFilter,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from "@massalabs/massa-web3";
import { IEvent } from "@massalabs/web3-utils";

interface IEventPollerResult {
  isError: boolean;
  eventPoller: EventPoller;
  events: IEvent[];
}
const MASSA_EXEC_ERROR = "massa_execution_error";

const pollAsyncEvents = async (
  web3Client: Client,
  opId: string
): Promise<IEventPollerResult> => {
  // determine the last slot
  let nodeStatusInfo: INodeStatus | null | undefined = await web3Client
    .publicApi()
    .getNodeStatus();

  const start = nodeStatusInfo.last_slot;
  start.period = start.period - 1000;
  // set the events filter
  const eventsFilter = {
    start: start,
    end: null,
    original_caller_address: null,
    original_operation_id: opId,
    emitter_address: null,
    is_final: false,
  } as IEventFilter;

  const eventPoller = EventPoller.startEventsPolling(
    eventsFilter,
    1000,
    web3Client
  );

  return new Promise((resolve, reject) => {
    eventPoller.on(ON_MASSA_EVENT_DATA, (events: Array<IEvent>) => {
      console.log("Event Data Received:", events);
      let errorEvents: IEvent[] = events.filter((e) =>
        e.data.includes(MASSA_EXEC_ERROR)
      );
      if (errorEvents.length > 0) {
        return resolve({
          isError: true,
          eventPoller,
          events: errorEvents,
        } as IEventPollerResult);
      }

      if (events.length) {
        return resolve({
          isError: false,
          eventPoller,
          events,
        } as IEventPollerResult);
      } else {
        console.log("No events have been emitted during deployment");
      }
    });
    eventPoller.on(ON_MASSA_EVENT_ERROR, (error: Error) => {
      console.log("Event Data Error:", error);
      return reject(error);
    });
  });
};

export default pollAsyncEvents;
