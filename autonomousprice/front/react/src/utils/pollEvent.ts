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
  private latestSlot: ISlot | null = null;
  private filter: EventFilter;
  private subscribers: Array<(events: Array<IEvent>) => void> = [];
  private client: IClient;
  private pollingInterval: number;
  private pollingId: ReturnType<typeof setInterval> | null = null;

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

  static async createInstance(
    contractAddress: string,
    client: IClient,
    _filter?: EventFilter
  ): Promise<EventListener> {
    try {
      if (_filter) {
        return new EventListener(client, _filter);
      }
      const currentNodeStatus = await client.publicApi().getNodeStatus();
      const latestSlot = currentNodeStatus.last_slot;

      if (!latestSlot) throw new Error("Could not fetch latest slot");

      latestSlot.period -= 3;

      const filter: EventFilter = {
        start: latestSlot,
        end: null,
        emitter_address: contractAddress,
        original_caller_address: null,
        original_operation_id: null,
        is_final: true,
      };

      return new EventListener(client, filter);
    } catch (error) {
      console.error("Error creating EventListener instance:", error);
      throw error;
    }
  }

  public subscribe(subscriber: (events: Array<IEvent>) => void): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: (events: Array<IEvent>) => void): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

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

  public startPolling(): void {
    if (this.pollingId) {
      clearInterval(this.pollingId);
    }
    this.pollingId = setInterval(
      () => this.fetchEvents(),
      this.pollingInterval
    );
  }

  public stopPolling(): void {
    if (this.pollingId) {
      clearInterval(this.pollingId);
      this.pollingId = null;
    }
  }
}
