import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deploySC, WalletClient, ISCData } from '@massalabs/massa-sc-deployer';
import {
  Client,
  ClientFactory,
  IProvider,
  ISlot,
  ProviderType,
  IEvent,
  fromMAS,
  Args,
} from '@massalabs/massa-web3';
import delay from 'delay';

dotenv.config();

const publicApi = process.env.JSON_RPC_URL_PUBLIC;
if (!publicApi) {
  throw new Error('Missing JSON_RPC_URL_PUBLIC in .env file');
}
const privKey = process.env.WALLET_PRIVATE_KEY;
if (!privKey) {
  throw new Error('Missing WALLET_PRIVATE_KEY in .env file');
}

const deployerAccount = await WalletClient.getAccountFromSecretKey(privKey);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(path.dirname(__filename));

const client: Client = await ClientFactory.createCustomClient(
  [
    { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
    { url: publicApi, type: ProviderType.PRIVATE } as IProvider,
  ],
  true,
  deployerAccount,
);

// get the next slot
const nextSlot = (prevSlot: ISlot) => {
  const slot = prevSlot;
  if (slot.thread < 31) {
    slot.thread++;
  } else {
    slot.thread = 0;
    slot.period++;
  }
  return slot;
};

// returns true if slot2 is the oldest slot
const isLatestSlot = (slot1: ISlot, slot2: ISlot) => {
  if (
    slot1.period > slot2.period ||
    (slot1.period === slot2.period && slot1.thread > slot2.thread)
  ) {
    return slot1;
  }
  return slot2;
};

(async () => {
  const deployed = await deploySC(
    publicApi,
    deployerAccount,
    [
      {
        data: readFileSync(path.join(__dirname, 'build', 'oracle.wasm')),
        coins: fromMAS(0.1),
      } as ISCData,
    ],
    0n,
    4_200_000_000n,
    true,
  );

  const deployedSCEvent = deployed.events?.find((e) =>
    e.data.includes('Contract deployed at address'),
  );

  if (!deployedSCEvent) {
    console.log('failed to retrieve deploy address');
    process.exit(1);
  }

  const addr = deployedSCEvent.data.substring(
    'Contract deployed at address: '.length,
    deployedSCEvent.data.length,
  );
  let fromSlot = nextSlot(deployedSCEvent.context.slot);
  console.log(`listening autonomous SC events on "${addr}"`);

  while (1) {
    console.log(
      `get events from period ${fromSlot.period} thread ${fromSlot.thread}`,
    );

    const events: IEvent[] = await client
      .smartContracts()
      .getFilteredScOutputEvents({
        emitter_address: addr,
        start: fromSlot,
        end: null,
        original_caller_address: null,
        original_operation_id: null,
        is_final: true,
      });

    if (events.length) {
      console.log(`${events.length} events received:`);

      // Gather events from the same slot and print data
      const uniqueBlocks = [...new Set(events.map((e) => e.context.block))];
      for (const blockId of uniqueBlocks) {
        const logs = events.filter((e) => e.context.block === blockId);
        logs.map((l) => console.log(l.data));
        const blockSlot = logs[0].context.slot;
        console.log(logs[0].context.slot);
        console.log('\n');

        // Increase event listening start slot
        fromSlot = isLatestSlot(blockSlot, fromSlot) ? blockSlot : fromSlot;
        fromSlot = nextSlot(fromSlot);
      }
    }

    await delay(5000);
  }
})();
