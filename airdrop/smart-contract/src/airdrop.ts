import { Account, Mas, MRC20, Web3Provider } from '@massalabs/massa-web3';
import * as dotenv from 'dotenv';
import { getScByteCode, logEvent } from './utils';
import { addressList } from '../assembly/const/addressList';
import { mrc20Address } from '../assembly/const/mrc20-address';

dotenv.config();

/* -------------------------------------------------------------------------- */
/*                                Init Provider                               */
/* -------------------------------------------------------------------------- */
const account = await Account.fromEnv();
const provider = Web3Provider.buildnet(account);

/* -------------------------------------------------------------------------- */
/*                                 Init MRC20                                 */
/* -------------------------------------------------------------------------- */
const mrc20 = new MRC20(provider, mrc20Address);
const mr20Symbol = await mrc20.symbol();
let mrc20Balance = await mrc20.balanceOf(account.address.toString());

console.log(`My Mas balance: ${await provider.balance()}`);
console.log(`My ${mr20Symbol} balance: ${mrc20Balance}`);

/* -------------------------------------------------------------------------- */
/*                                 Airdrop                                    */
/* -------------------------------------------------------------------------- */
const operation = await provider.executeSC({
  byteCode: getScByteCode('build', 'airdrop.wasm'),
  maxCoins: Mas.fromString('10'), // Maximum amount of coins allowed to be spend during the execution
});

const events = await operation.getFinalEvents();

for (const [index, event] of events.entries()) {
  if (event.data.toString().includes('Error')) {
    throw new Error(`Error in event nº ${index + 1}: ${event.data.toString()}`);
  }
  logEvent(event, index);
}

/* -------------------------------------------------------------------------- */
/*                               Final Balances                               */
/* -------------------------------------------------------------------------- */

const balances = await mrc20.balancesOf(addressList);
for (const { address, balance } of balances) {
  console.log(`Address: ${address}, Balance: ${balance.toString()}`);
}

mrc20Balance = await mrc20.balanceOf(account.address.toString());

console.log('My final MAS balance:', (await provider.balance()).toString());
console.log('My final', mr20Symbol, 'balance:', mrc20Balance.toString());
