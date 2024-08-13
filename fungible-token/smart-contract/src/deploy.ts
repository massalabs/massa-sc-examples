/* eslint-disable no-console */
import { Account, Args, Mas, Web3Provider } from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

async function deploy() {
  const account = await Account.fromEnv();
  const provider = Web3Provider.newPublicBuildnetProvider(account);

  console.log('Deploying contract...');

  const byteCode = getScByteCode('build', 'token.wasm');
  const tokenArgs = new Args()
    .addString('Massa Token')
    .addString('MAS')
    .addU8(9n)
    .addU256(120000000000n * 10n ** 9n);

  const contract = await provider.deploySC({
    coins: Mas.fromString('1'),
    byteCode,
    parameter: tokenArgs.serialize(),
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
