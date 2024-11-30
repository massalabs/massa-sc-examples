/* eslint-disable no-console */
import {
  Account,
  Args,
  Mas,
  SmartContract,
  Web3Provider,
} from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

const rpcUrl = 'https://labnet.massa.net/api/v2:33035';
const account = await Account.fromEnv();
const provider = Web3Provider.fromRPCUrl(rpcUrl, account);

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

const events = await provider.getEvents({
  smartContractAddress: contract.address,
});

for (const event of events) {
  console.log('Event message:', event.data);
}
