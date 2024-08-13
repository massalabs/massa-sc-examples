/* eslint-disable no-console */
import {
  Account,
  Args,
  Mas,
  SmartContract,
  Web3Provider,
} from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

async function deploy() {
  const account = await Account.fromEnv();
  const provider = Web3Provider.newPublicBuildnetProvider(account);

  console.log('Deploying contract...');

  const byteCode = getScByteCode('build', 'main.wasm');
  const constructorArgs = new Args().addString('Massa');

  const contract: SmartContract = await provider.deploySC({
    coins: Mas.fromString('0.01'),
    byteCode,
    parameter: constructorArgs.serialize(),
  });

  console.log('Contract deployed at:', contract.address);

  const events = await provider.getEvents({
    smartContractAddress: contract.address,
  });

  for (const event of events) {
    console.log('Event: ', event.data);
  }
}

deploy();
