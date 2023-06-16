import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deploySC, WalletClient, ISCData } from '@massalabs/massa-sc-deployer';
import {
  Client,
  ClientFactory,
  IProvider,
  ProviderType,
  MassaCoin,
} from '@massalabs/massa-web3';
import { Args } from '@massalabs/as-types';
import {
  call,
  generateEvent,
  Address,
} from '@massalabs/massa-as-sdk';
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

(async () => {
  // Deploy the DNS contract
  const deployed = await deploySC(
    publicApi,
    deployerAccount,
    [
      {
        data: readFileSync(path.join(__dirname, 'build', 'dns.wasm')),
        coins: new MassaCoin(1),
      } as ISCData,
    ],
    0,
    4_200_000_000,
    true,
  );

  const deployedSCEvent = deployed.events?.find((e) =>
    e.data.includes('Contract deployed at address'),
  );

  if (!deployedSCEvent) {
    console.log('Failed to retrieve deploy address');
    process.exit(1);
  }

  const dnsContractAddress = deployedSCEvent.data.substring(
    'Contract deployed at address: '.length,
    deployedSCEvent.data.length,
  );

  console.log('DNS Contract deployed at address:', dnsContractAddress);

  // Address of the DNS contract
  const dnsAddress = new Address(dnsContractAddress);

  // List of website names to be blacklisted
  const websiteNames = ['blacklist1', 'blacklist2', 'blacklist3'];

  generateEvent(`Blacklisting website names`);

  // Serialize the website names using Args
  const args = new Args().addNativeTypeArray(websiteNames);
  const websiteNamesBinary = args.serialize();

  // Call the DNS contract's addWebsitesToBlackList function
  call(
    dnsAddress,
    'addWebsitesToBlackList',
    new Args().add(websiteNamesBinary),
    0,
  );

  console.log('Website names blacklisted:', websiteNames);

  // Return (optional)
  return;
})();
