import {
  callerHasWriteAccess,
  generateEvent,
  Context,
  sendMessage,
  Storage,
  unsafeRandom,
} from '@massalabs/massa-as-sdk';
import { u64ToBytes } from '@massalabs/as-types';
import { currentPeriod } from '@massalabs/massa-as-sdk/assembly/std/context';

const PRICE_KEY = 'PRICE_KEY';
const INIT_PRICE = 100000 as u64;
const MAX_CHANGE = 20;


export function constructor(_: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensure that this function can't be called in the future.
  // If you remove this check someone could call your constructor function and reset your SC.
  assert(callerHasWriteAccess(), 'Caller is not allowed');

  Storage.set(PRICE_KEY, INIT_PRICE.toString());
  generateEvent(`Set initial price to ${INIT_PRICE.toString()}`);

  sendFutureOperation();
  return [];
}

export function sendFutureOperation(): void {
  const address = Context.callee();
  const functionName = 'updatePrice';
  const validityStartPeriod = currentPeriod() + 1;
  const validityStartThread = 0 as u8;
  const validityEndPeriod = validityStartPeriod;
  const validityEndThread = 31 as u8;

  const maxGas = 500_000_000; // gas for smart contract execution
  const rawFee = 0;
  const coins = 0;

  // Send the message
  sendMessage(
    address,
    functionName,
    validityStartPeriod,
    validityStartThread,
    validityEndPeriod,
    validityEndThread,
    maxGas,
    rawFee,
    coins,
    [],
  );

  generateEvent(
    `next update planned on period ${validityStartPeriod.toString()} thread: ${validityStartThread.toString()}`,
  );
}

export function updatePrice(_: StaticArray<u8>): StaticArray<u8> {

  const currentPrice = u64.parse(Storage.get(PRICE_KEY));

  
  const priceChange = unsafeRandom() % (2 * MAX_CHANGE + 1) - MAX_CHANGE;

  const newPrice = currentPrice + priceChange;

  Storage.set(PRICE_KEY, newPrice.toString());

  generateEvent(`🎉 Price updated: ${newPrice.toString()}`);

  sendFutureOperation();

  return u64ToBytes(newPrice);
}

export function getPrice(_: StaticArray<u8>): StaticArray<u8> {
  assert(Storage.has(PRICE_KEY), 'Price is not set');

  const price = u64.parse(Storage.get(PRICE_KEY));
  generateEvent(`current price is ${price.toString()} ${Storage.has(PRICE_KEY).toString()}`);

  return u64ToBytes(price);
}
