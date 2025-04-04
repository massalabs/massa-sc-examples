/* eslint-disable no-console */
import { Account, Args, Mas, Web3Provider } from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

async function deploy() {
  const account = await Account.fromEnv('WALLET_PRIVATE_KEY');
  const provider = Web3Provider.buildnet(account);

  console.log('Deploying contract...');

  const byteCode = getScByteCode('build', 'main.wasm');
  const constructorArgs = new Args().addString('Massa');

  const contract = await provider.deploySC({
    coins: Mas.fromString('1'),
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
