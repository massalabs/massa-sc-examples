"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { IAccount, IProvider, providers } from "@massalabs/wallet-provider";
import pollAsyncEvents from "./pollAsyncEvent";
import {
  Args,
  toMAS,
  Client,
  IClient,
  ClientFactory,
  fromMAS,
} from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = "AS1MAtScFwncd19rktPEqHQ8D3ZicoDGKm7nXyt1AaJFfzAx3Lbg";

const getWallet = async (walletName: string) => {
  const wallets = await providers();
  const _wallet = wallets.find((wallet) => {
    if (wallet.name() === walletName) {
      return wallet;
    }
  });

  return _wallet;
};

export default function Home() {
  const [client, setClient] = useState<Client | null>(null);
  const [accounts, setAccounts] = useState<IAccount[] | null>(null); // [IAccount, setAccounts
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [finalBalance, setFinalBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const balance = toMAS(finalBalance || 0).toString();
  const account = selectedAccount?.address() || "No account";

  const initAccount = async (wallet: IProvider) => {
    const accounts: IAccount[] = await wallet.accounts();
    if (!accounts.length) {
    }
    return accounts;
  };

  const initClientWallet = async (wallet: IProvider, account: IAccount) => {
    return await ClientFactory.fromWalletProvider(wallet, account);
  };

  const init = async (chosenWallet: string) => {
    const wallet = await getWallet(chosenWallet);
    if (!wallet) return;

    const accounts: IAccount[] = await initAccount(wallet);
    console.log(accounts);
    setAccounts(accounts);
    if (!accounts.length) return;

    const account = accounts[0];
    setSelectedAccount(account);

    const client = await initClientWallet(wallet, account);
    setClient(client);

    setSelectedWallet(chosenWallet);
  };

  const getBalance = async (client: IClient, accountAddress: string) => {
    if (!client) return;

    const balance = await client.wallet().getAccountBalance(accountAddress);

    setFinalBalance(balance?.final.toString() || null);

    return balance?.final.toString();
  };

  async function storeMessage() {
    if (!client) return;

    try {
      setLoading(true);
      const result = await client.smartContracts().callSmartContract({
        fee: BigInt(1000),
        maxGas: BigInt(1000000),
        coins: BigInt(0),
        targetAddress: CONTRACT_ADDRESS,
        functionName: "storeMessage",
        parameter: new Args().addString("Hello World!"),
      });

      console.log(result);

      const eventPoll = await pollAsyncEvents(client, result);

      alert(`New event: ${eventPoll.events[0].data}`);
      setLoading(false);
    } catch (error) {}
  }

  async function buyRolls() {
    if (!client) return;

    try {
      const result = await client.wallet().buyRolls({
        amount: BigInt(1),
        fee: fromMAS(0),
      });
      console.log(result);
      const eventPoll = await pollAsyncEvents(client, result[0]);
      console.log(eventPoll);
    } catch (error) {}
  }

  async function sellRolls() {
    if (!client) return;

    try {
      const result = await client.wallet().sellRolls({
        amount: BigInt(1),
        fee: fromMAS(0),
      });
      console.log(result);
      const eventPoll = await pollAsyncEvents(client, result[0]);
      console.log(eventPoll);
    } catch (error) {}
  }

  // transfer
  async function sendTransaction() {
    if (!client) return;

    try {
      const result = await client.wallet().sendTransaction({
        amount: fromMAS(10),
        fee: fromMAS(1),
        recipientAddress:
          "AU1ab38HtjfYQLjForEGuprzyDyPJxp1KcodCqGbRTA3DWRMNxqo",
      });
      console.log(result);
      const eventPoll = await pollAsyncEvents(client, result[0]);
      console.log(eventPoll);
    } catch (error) {}
  }

  useEffect(() => {
    init("MASSASTATION");
  }, []);

  useEffect(() => {
    const accountAddress = selectedAccount?.address();
    if (!accountAddress || !client) return;
    getBalance(client, accountAddress);
  }, [client, selectedAccount]);

  function getButtonLabel(message?: string) {
    if (loading) {
      return "Loading...";
    }

    if (selectedWallet) {
      return message;
    }

    return "You need to connect a wallet";
  }

  return (
    <main className="h-screen">
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="col-span-2 inline-block bg-white shadow-lg rounded-lg p-4 mx-10">
          {/* grid that splits in 2 columns and 1 row */}
          <div className=" items-center">
            <DisplayInfo name="Wallet" info={selectedWallet || "No wallet"} />
            <DisplayInfo name="Account" info={account} />
            <DisplayInfo name="Balance" info={balance} />
          </div>
        </div>
        <div className=" items-center">
          <DisplayWalletButton init={init} />
        </div>
      </div>

      <div className="mt-4 p-5 flex gap-4">
        <BasicButton onClick={storeMessage}>
          {getButtonLabel("CallSmartContract")}
        </BasicButton>
        <BasicButton onClick={buyRolls}>
          {getButtonLabel("BuyRolls")}
        </BasicButton>
        <BasicButton onClick={sellRolls}>
          {getButtonLabel("SellRolls")}
        </BasicButton>
        <BasicButton onClick={sendTransaction}>
          {getButtonLabel("SendTransaction")}
        </BasicButton>
      </div>
    </main>
  );
}

const BasicButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
    onClick={onClick}
  >
    {children}
  </button>
);

const DisplayInfo = ({ name, info }: { name: string; info: string }) => (
  <div className="flex items-center overflow-clip">
    <h2 className="font-bold mr-2">{name}: </h2>
    <p className=" truncate w-full">{info}</p>
  </div>
);

const DisplayWalletButton = ({
  init,
}: {
  init: (walletName: string) => void;
}) => (
  <div className="p-4 flex flex-col gap-4">
    <BasicButton
      onClick={() => {
        init("MASSASTATION");
      }}
    >
      Connect Massa Station
    </BasicButton>
    <BasicButton
      onClick={() => {
        init("BEARBY");
      }}
    >
      Connect Bearby
    </BasicButton>
  </div>
);
