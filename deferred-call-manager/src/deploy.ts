/* eslint-disable no-console */
import { Args, Mas, SmartContract } from '@massalabs/massa-web3';
import { getAccountProvider, getScByteCode } from './utils';

async function deployContract() {
  const provider = await getAccountProvider();

  console.log('Deploying contract...');

  const byteCode = getScByteCode('build', 'main.wasm');

  // 1 minutes in period of 16 seconds
  const periodInSeconds = 16;
  const minutes = 1;
  const periods = Math.round((minutes * 60) / periodInSeconds);

  const constructorArgs = new Args().addU64(BigInt(periods));

  const contract = await SmartContract.deploy(
    provider,
    byteCode,
    constructorArgs,
    { coins: Mas.fromString('1') },
  );

  console.log('Contract deployed at:', contract.address);
  console.log(
    `You might want to add the line: \nCONTRACT_ADDRESS="${contract.address}"\n to your .env file`,
  );

  const events = await provider.getEvents({
    smartContractAddress: contract.address,
  });

  for (const event of events) {
    console.log('Event message:', event.data);
  }
}

await deployContract();
