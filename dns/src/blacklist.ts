import * as dotenv from 'dotenv';
import { WalletClient } from '@massalabs/massa-sc-deployer';
import {
  Args,
  ClientFactory,
  DefaultProviderUrls,
} from '@massalabs/massa-web3';
import { TypedArrayUnit } from '@massalabs/massa-web3/dist/esm/utils/arguments';

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

// List of website names to be blacklisted
const websiteNames = ['blacklist1', 'blacklist2', 'blacklist3'];

// Serialize the website names using Args
const websiteNamesBinary = new Args()
  .addNativeTypeArray(websiteNames, TypedArrayUnit.STRING)
  .serialize();

// Dummy address (replace it with the actual address)
const dnsScAddr = 'AS129fg2eHHQW7D3bn8KqPsBibNRTK1t3JBHyPTJtBaanPi5kJtag';

(async () => {
  // Create the default web3 client
  const web3Client = await ClientFactory.createDefaultClient(
    publicApi as DefaultProviderUrls,
    false,
    adminAccount,
  );

  // Call the smart contract's "addWebsitesToBlackList" function
  await web3Client.smartContracts().callSmartContract(
    {
      fee: BigInt(0),
      maxGas: BigInt(70000000),
      coins: BigInt(0),
      targetAddress: dnsScAddr,
      functionName: 'addWebsitesToBlackList',
      parameter: websiteNamesBinary,
    },
    adminAccount,
  );
})();
