import { useState, useEffect } from "react";
import {
  IClient,
  ClientFactory,
  IEvent,
  MAX_GAS_CALL,
} from "@massalabs/massa-web3";
import { providers } from "@massalabs/wallet-provider";
import { EventListener } from "./utils/pollEvent";

const CONTRACT_ADDRESS = "AS1q1CBeirGUArRUnSFBCRZw3djf6k1jgeXcYfuTBiEFJ39ioxij";

export default function AutonomousPriceInteraction() {
  MAX_GAS_CALL;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [client, setClient] = useState<IClient | null>(null);
  const [price, setPrice] = useState<string>("");
  const [listener, setListener] = useState<EventListener | null>(null);

  const updatePrice = (newEvents: Array<IEvent>) => {
    const [lastPriceEvent, lastUpdateInfoEvent] = newEvents.slice(-2);

    console.table({
      "Last price event": lastPriceEvent.data,
      "Last update info event": lastUpdateInfoEvent.data,
    });

    if (!lastPriceEvent.data.includes("Price updated")) return;
    const match = lastPriceEvent.data.match(/\d+/g);
    if (!match) return;
    setPrice(match[0]);
  };

  // setErrorMessage("");
  async function initializeEventListener(client: IClient) {
    const listener = await EventListener.createInstance(
      CONTRACT_ADDRESS,
      client
    );
    listener.subscribe(updatePrice);
    setListener(listener);
  }

  useEffect(() => {
    if (client) initializeEventListener(client);
    return () => {
      listener?.stopPolling();
    };
  }, [client]);

  async function initProvider() {
    setErrorMessage("");

    const allProviders = await providers();

    if (!allProviders || allProviders.length === 0) {
      throw new Error("No providers available");
    }

    const massastationProvider = allProviders.find(
      (provider) => provider.name() === "MASSASTATION"
    );

    if (!massastationProvider) {
      setErrorMessage("MASSASTATION provider not found");
      return;
    }

    const accounts = await massastationProvider.accounts();
    if (accounts.length === 0) {
      setErrorMessage("No accounts found");
      return;
    }

    const account = accounts[0];

    const newClient = await ClientFactory.fromWalletProvider(
      massastationProvider,
      account
    );

    setClient(newClient);
  }

  useEffect(() => {
    initProvider();

    return () => {
      listener?.unsubscribe(updatePrice);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-4">
      {errorMessage && (
        <div className="alert alert-error shadow-lg w-auto absolute top-10 animate-slideFromTop">
          <span>{errorMessage}</span>
          <div>
            <button className="btn btn-sm btn-primary" onClick={initProvider}>
              Reload
            </button>
          </div>
        </div>
      )}
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Massa Autonomous Price</div>
          <div className="stat-value text-secondary">
            {price ? (
              `${price} MAS`
            ) : (
              <p className="w-full ">
                Fetching price
                <span className="loading loading-ring loading-md ml-3"></span>
              </p>
            )}
          </div>
          <div className="stat-desc">
            <p>Price will be randomly changed by +/- 5% automatically</p>
            <p>Watch in console for logs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
