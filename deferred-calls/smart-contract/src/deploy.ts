/* eslint-disable no-console */
import {
  Account,
  Args,
  Mas,
  SmartContract,
  Web3Provider,
} from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

const URL = 'http://145.239.66.206:33035';
// const URL = 'http://127.0.0.1:33035';

async function deploy() {
  const account = await Account.fromEnv('WALLET_PRIVATE_KEY'
  );

  const provider = Web3Provider.fromRPCUrl(
    URL,
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
  const account = await Account.fromEnv(
    'WALLET_PRIVATE_KEY',
  );

  const provider = Web3Provider.fromRPCUrl(
    URL,
    account,
  );

  const contract = new SmartContract(
    provider,
    SC_ADDR,
  );

  const op = await contract.call('cancelCall', new Args().serialize());
  console.log(op);

  const events = await op.getSpeculativeEvents();

  for (const event of events) {
    console.log('Event: ', event.data);
  }
}

async function register() {
  const account = await Account.fromEnv(
    'WALLET_PRIVATE_KEY',
  );

  const provider = Web3Provider.fromRPCUrl(
    URL,
    account,
  );
  const contract = new SmartContract(
    provider,
    SC_ADDR,
  );

  const op = await contract.call('registerCall', new Args().serialize());

  console.log(op);
  const events = await op.getSpeculativeEvents();

  for (const event of events) {
    console.log('Event: ', event.data);
  }
}

async function callfn(fn: string) {
  const account = await Account.fromEnv(
    'WALLET_PRIVATE_KEY',
  );

  const provider = Web3Provider.fromRPCUrl(
    URL,
    account,
  );
  const contract = new SmartContract(
    provider,
    SC_ADDR,
  );

  const op = await contract.call(fn, new Args().serialize());

  console.log(op);
  const events = await op.getSpeculativeEvents();

  for (const event of events) {
    console.log('Event: ', event.data);
  }
}

// const SC_ADDR = "AS122u3fB4T6otryu3M4Ws6d9zgF5hbDo2ecFEWKRbnCEF8a5DtM1";

const SC_ADDR = "AS12P8NL1A7HuPRt8gqyrRByWjrpFDnvA6tHHaCMYKvjrdZSvB9sh"; // labnet

// deploy();
// cancel();

// callfn('cancelCall');
// callfn('registerCall');
// callfn('registerCall2');
callfn('cancelCall2');
