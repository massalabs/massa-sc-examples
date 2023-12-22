import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deploySC, WalletClient, ISCData } from '@massalabs/massa-sc-deployer';
import { Args, MAX_GAS_DEPLOYMENT, fromMAS } from '@massalabs/massa-web3';

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
  await deploySC(
    publicApi,
    deployerAccount,
    [
      {
        data: readFileSync(
          path.join(__dirname, 'build', 'autonomousprice.wasm'),
        ),
        coins: fromMAS(0.1),
        args: new Args().addString('Test'),
      } as ISCData,
    ],
    0n,
    MAX_GAS_DEPLOYMENT,
    true,
  );
  process.exit(0);
})();
