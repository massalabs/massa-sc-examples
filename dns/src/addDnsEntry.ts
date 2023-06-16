import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deploySC, WalletClient, ISCData } from '@massalabs/massa-sc-deployer';
import { Args, fromMAS, ClientFactory, DefaultProviderUrls } from '@massalabs/massa-web3';
import {
  call,
  generateEvent,
  Address,
} from '@massalabs/massa-as-sdk';

dotenv.config();

// Read environment variables
const publicApi = process.env.JSON_RPC_URL_PUBLIC;
if (!publicApi) {
  throw new Error('Missing JSON_RPC_URL_PUBLIC in .env file');
}

const privKey = process.env.WALLET_PRIVATE_KEY;
if (!privKey) {
  throw new Error('Missing WALLET_PRIVATE_KEY in .env file');
}

// Get the admin account from the provided private key
const adminAccount = await WalletClient.getAccountFromSecretKey(privKey);

// Website parameters to add to the DNS
const websiteName = "flappy";

const websiteDescription: string = `
Experience the addictive joy of Flappy game on our website,
where you navigate a string through challenging obstacles with simple taps.
Get ready to soar to new heights!
`;

// Dummy address (replace it with the actual address)
const website_sc_addr = new Address('').serialize();

// Dummy address (replace it with the actual address)
const dns_sc_addr = new Address('').serialize();

// Generate an event to indicate the intention of adding a new entry to the DNS
generateEvent('Adding new entry to the DNS...');

// Serialize the website parameters using Args
const setResolverArgs = new Args()
  .add(websiteName)
  .add(website_sc_addr)
  .add(websiteDescription)
  .serialize();

(async () => {
  // Create the default web3 client
  const web3Client = await ClientFactory.createDefaultClient(publicApi as DefaultProviderUrls, false, adminAccount);

  // Call the smart contract's "setResolver" function
  await web3Client.smartContracts().callSmartContract({
    fee: BigInt(0),
    maxGas: BigInt(70000000),
    coins: BigInt(0),
    targetAddress: dns_sc_addr,
    functionName: 'setResolver',
    parameter: setResolverArgs,
  }, adminAccount);
})();
