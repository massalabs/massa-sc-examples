import * as dotenv from 'dotenv';
import { WalletClient } from '@massalabs/massa-sc-deployer';
import {
  Args,
  ClientFactory,
  DefaultProviderUrls,
} from '@massalabs/massa-web3';

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
const websiteName = 'flappy';

const websiteDescription = `
Experience the addictive joy of Flappy game on our website,
where you navigate a string through challenging obstacles with simple taps.
Get ready to soar to new heights!
`;

// Dummy address (replace it with the actual address)
const websiteScAddr = 'AS1s58fxda7hftippRx7gMEgADqP4RAyYxBX7iJkiqgFfrMHuo2R';

// Dummy address (replace it with the actual address)
const dnsScAddr = '';

// Serialize the website parameters using Args
const setResolverArgs = new Args()
  .addString(websiteName)
  .addString(websiteScAddr)
  .addString(websiteDescription)
  .serialize();

(async () => {
  // Create the default web3 client
  const web3Client = await ClientFactory.createDefaultClient(
    publicApi as DefaultProviderUrls,
    false,
    adminAccount,
  );

  // Call the smart contract's "setResolver" function
  await web3Client.smartContracts().callSmartContract(
    {
      fee: BigInt(0),
      maxGas: BigInt(70000000),
      coins: BigInt(0),
      targetAddress: dnsScAddr,
      functionName: 'setResolver',
      parameter: setResolverArgs,
    },
    adminAccount,
  );
})();
