import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deploySC, WalletClient, ISCData, IDeploymentInfo } from '@massalabs/massa-sc-deployer';
import { Args, IEvent, fromMAS } from '@massalabs/massa-web3';

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
  let deployInfo = await deploySC(
    publicApi,
    deployerAccount,
    [
      {
        data: readFileSync(path.join(__dirname, 'build', 'main.wasm')),
        coins: fromMAS(4),
        args: new Args(),
      } as ISCData,
    ],
    0n,
    4_200_000_000n,
    true,
  );
  /*const data = (deployInfo.events?.find((e) => e.data) as IEvent).data;
  const address = data.split('Contract deployed at address:')[1].trim();
  await deploySC(
    publicApi,
    deployerAccount,
    [
      {
        data: readFileSync(path.join(__dirname, 'build', 'run.wasm')),
        coins: fromMAS(0.5),
        args: new Args().addString(address),
      } as ISCData,
    ],
    0n,
    8_200_000_000n,
    true,
  );*/
  process.exit(0);
})();

