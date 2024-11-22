import { Account, Mas, MRC20, Web3Provider } from '@massalabs/massa-web3';
import * as dotenv from 'dotenv';
import { getScByteCode, logBalance, logEvents } from './utils';
import { addressList } from '../assembly/contracts/addressList';
import { mrc20Address } from '../assembly/contracts/mrc20-address';

dotenv.config();

const account = await Account.fromEnv();
const provider = Web3Provider.buildnet(account);

const FT = new MRC20(provider, mrc20Address);
let mrc20Balance = await FT.balanceOf(account.address.toString());
const mr20Symbol = await FT.symbol();

console.log('My address:', account.address.toString());
logBalance('Initial Mas', await provider.balance(), 'MAS');
logBalance('Initial MRC20', mrc20Balance, mr20Symbol);

const byteCode = getScByteCode('build', 'airdrop.wasm');
const operation = await provider.executeSC({
  byteCode,
  maxCoins: Mas.fromString('10'), // Maximum amount of coins allowed to be spend during the execution
});

const events = await operation.getFinalEvents();

for (const [index, event] of events.entries()) {
  if (event.data.toString().includes('Error')) {
    throw new Error(`Error in event nº ${index + 1}: ${event.data.toString()}`);
  }
  logEvents(event, index);
}

for (const address of addressList) {
  const balance = await FT.balanceOf(address);
  logBalance(`Address ${address}`, balance, mr20Symbol);
}

mrc20Balance = await FT.balanceOf(account.address.toString());

logBalance('Final Mas', await provider.balance(), 'MAS');
logBalance('Final MRC20', mrc20Balance, mr20Symbol);
console.log('Airdrop done');
