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
  const account = await Account.fromPrivateKey(
    'S1NA786im4CFL5cHSmsGkGZFEPxqvgaRP8HXyThQSsVnWj4tR7d',
  );

  const provider = Web3Provider.fromRPCUrl(
    'http://145.239.66.206:33035',
    account,
  );

  console.log('Deploying contract...');

  const byteCode = getScByteCode('build', 'main.wasm');

  const contract = await provider.deploySC({
    coins: Mas.fromString('5'),
    byteCode,
  });

  console.log('Contract deployed at:', contract.address);

  let events = await provider.getEvents({
    smartContractAddress: contract.address,
  });

  for (const event of events) {
    console.log('Event: ', event.data);
  }
}

async function cancel() {
  const account = await Account.fromPrivateKey(
    'S1NA786im4CFL5cHSmsGkGZFEPxqvgaRP8HXyThQSsVnWj4tR7d',
  );

  const provider = Web3Provider.fromRPCUrl(
    'http://145.239.66.206:33035',
    account,
  );
  const contract = new SmartContract(
    provider,
    'AS1hp8xSYTfdEujpWkMHsuEqmozY96TFBK5RyuUrvP4DRuVBinuB',
  );

  const op = await contract.call('cancelCall', new Args().serialize());

  const events = await op.getSpeculativeEvents();

  for (const event of events) {
    console.log('Event: ', event.data);
  }
}

// deploy();
cancel();
