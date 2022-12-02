import {
  Args,
  Client,
  ClientFactory,
  DefaultProviderUrls,
  IAccount,
} from "@massalabs/massa-web3";
import { useEffect, useState } from "react";

const baseAccount = {
  publicKey: "P12f2K8YoeqZCzWASs2wktFYYGtaHGYaeSukFBrgEnw9d3J1WsMZ",
  secretKey: "S17Zw8KN3QSzsWGof7PTgkTvyGYbZLNMZmjC4urr6ZziLonThqk",
  address: "A1qZL4iJYRDRo9EtDauJuWNj56FNXWhtKinv15GEakraBa91dEA",
} as IAccount;

const sc_addr = "A12VVvTD8bdj1LDwc2uuFNKxT26AxQGv8aDgpWS9EVjekEwTZSab"

function Content() {
  const [web3client, setWeb3client] = useState<Client | null>(null);
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const initClient = async () => {
      const client = await ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, false, baseAccount);
      setWeb3client(client);
    }

    initClient().catch(console.error);
  }, []);

  async function funcSetAge(age: number) {
    let args = new Args();
    args.addString("alice");
    args.addU32(BigInt(age));
    if (web3client) {
      const age = await web3client.smartContracts().callSmartContract({
        fee: 0,
        maxGas: 1000000,
        coins: 0,
        targetAddress: sc_addr,
        functionName: "change_age",
        parameter: args.serialize()
      });
    }
  }

  async function funcGetAge() {
    if (web3client) {
      let res = await web3client.publicApi().getDatastoreEntries([{ key: Array.from(Buffer.from("alice", "utf16le")), address: sc_addr }]);
      if (res[0].candidate_value) {
        let age_decode = new Args(res[0].candidate_value);
        let age = age_decode.nextU32();
        setAge(Number(age));
      }
    }
  }

  return (
    <div>
      <div>Alice: {age}</div>
      
      <button onClick={async () => await funcSetAge(age! + 1)}>Age++</button>
      <button onClick={async () => await funcSetAge(age! - 1)}>Age--</button>
      {web3client ? (<button onClick={async () => {await funcGetAge()} } >load</button>): (<div>loading</div>)}
    </div>
  )
}

export default Content;