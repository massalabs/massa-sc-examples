import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deploySC, WalletClient, ISCData } from '@massalabs/massa-sc-deployer';
import { Args, IEvent } from '@massalabs/massa-web3';

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

(async () => {
  let deployedInfo = await deploySC(
    publicApi,
    deployerAccount,
    [
      {
        data: readFileSync(path.join(__dirname, 'build', 'main.wasm')),
        args: new Args(),
        coins: 0n,
      } as ISCData,
    ],
    0n,
    4_200_000_000n,
    true,
  );

  const data = (deployedInfo.events?.find((e) => e.data) as IEvent).data;
  const address = data.split('Contract deployed at address:')[1].trim();
  deployedInfo = await deploySC(
    publicApi,
    deployerAccount,
    [
      {
        data: readFileSync(path.join(__dirname, 'build', 'caller.wasm')),
        args: new Args().addString(address),
        coins: 100_000_000n,
      } as ISCData,
    ],
    0n,
    4_200_000_000n,
    true,
  );
})();
