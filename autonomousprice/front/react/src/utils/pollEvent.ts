// This file contains just an idea of how to poll events from the blockchain.
import { IClient, IEvent } from "@massalabs/massa-web3";
import { ISlot } from "@massalabs/web3-utils";

interface EventFilter {
  start: ISlot;
  end: ISlot | null;
  emitter_address: string;
  original_caller_address: string | null;
  original_operation_id: string | null;
  is_final: boolean;
}

export class EventListener {
  private client: IClient;
  private subscribers: Array<(events: Array<IEvent>) => void> = [];
  private filter: EventFilter;
  private pollingInterval: number;
  private pollingId: ReturnType<typeof setInterval> | null = null;
  private latestSlot: ISlot | null = null;

  /**
   * Constructs an instance of the EventListener class.
   *
   * @param {IClient} client - The client used to interact with the blockchain.
   * @param {EventFilter} filter - The filter used to specify which events the listener should listen to.
   * @param {number} pollingInterval - The interval (in milliseconds) at which the listener should poll for new events. Defaults to 5000ms.
   */
  constructor(
    client: IClient,
    filter: EventFilter,
    pollingInterval: number = 5000
  ) {
    this.client = client;
    this.filter = filter;
    this.latestSlot = filter.start;
    this.pollingInterval = pollingInterval;
    this.startPolling();
  }

  /**
   * Creates an instance of EventListener.
   * @param {string} contractAddress
   * @param {IClient} client
   *
   * @returns {Promise<EventListener>}
   *
   */
  static async createInstanceWithDefaultFilter(
    contractAddress: string,
    client: IClient,
    pollingInterval: number = 5000
  ): Promise<EventListener> {
    try {
      const currentNodeStatus = await client.publicApi().getNodeStatus();
      const latestSlot = currentNodeStatus.last_slot;

      if (!latestSlot) throw new Error("Could not fetch latest slot");

      latestSlot.period -= 10;

      const filter: EventFilter = {
        start: latestSlot,
        end: null,
        emitter_address: contractAddress,
        original_caller_address: null,
        original_operation_id: null,
        is_final: true,
      };

      return new EventListener(client, filter, pollingInterval);
    } catch (error) {
      console.error("Error creating EventListener instance:", error);
      throw error;
    }
  }

  /**
   * Subscribes a function to the EventListener.
   *
   * @param {function} subscriber - The function to be called when new events are received. This function should take an array of IEvent objects as its only parameter.
   */
  public subscribe(subscriber: (events: Array<IEvent>) => void): void {
    this.subscribers.push(subscriber);
  }

  /**
   * Unsubscribes a function from the EventListener.
   *
   * @param {function} subscriber - The function to be removed from the list of subscribers. This function should be the same one that was previously passed to the subscribe method.
   */
  public unsubscribe(subscriber: (events: Array<IEvent>) => void): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  /**
   * Fetches new events from the blockchain.
   *
   * @returns {Promise<void>}
   */
  private async fetchEvents(): Promise<void> {
    try {
      let events = await this.client
        .smartContracts()
        .getFilteredScOutputEvents(this.filter);

      if (events.length) {
        const lastEvent = events[events.length - 1];
        this.latestSlot = lastEvent.context.slot;
        this.latestSlot.period += 1;
        this.filter.start = this.latestSlot;

        this.subscribers.forEach((sub) => sub(events));
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  /**
   * Starts polling for new events.
   *
   * @returns {void}
   */
  public startPolling(): void {
    if (this.pollingId) {
      clearInterval(this.pollingId);
    }
    this.fetchEvents();
    this.pollingId = setInterval(
      () => this.fetchEvents(),
      this.pollingInterval
    );
  }

  /**
   * Stops polling for new events.
   *
   * @returns {void}
   */
  public stopPolling(): void {
    if (this.pollingId) {
      clearInterval(this.pollingId);
      this.pollingId = null;
    }
  }
}
