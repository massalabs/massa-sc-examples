import {
  callerHasWriteAccess,
  generateEvent,
  Context,
  sendMessage,
  Storage,
  unsafeRandom,
} from '@massalabs/massa-as-sdk';
import { currentPeriod } from '@massalabs/massa-as-sdk/assembly/std/context';

const PRICE_KEY = 'PRICE_KEY';
const INIT_PRICE: u64 = 10000;

@massaExport()
export function constructor(): void {
  // This line is important. It ensure that this function can't be called in the future.
  // If you remove this check someone could call your constructor function and reset your SC.
  assert(callerHasWriteAccess(), 'Caller is not allowed');

  setPrice();
}

function sendFuturOperation(): void {
  const functionName = 'setPrice';
  const address = Context.callee();
  const validityStartPeriod = currentPeriod() + 1;
  const validityStartThread = 0 as u8;
  const validityEndPeriod = validityStartPeriod;
  const validityEndThread = 31 as u8;
  const maxGas = 1_000_000_000; // gas for smart contract execution
  const rawFee = 0;
  const coins = 0; // coins that can be used inside SC

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

// Generate a random price change of +/- 5%.
function generateRandomIncrease(base: u64): u64 {
  const randomInt = unsafeRandom();
  const increasePercent = (abs(randomInt) % 10) - 5;
  const increase = ((base as i64) * increasePercent) / 100;

  if (increase < 0 && base <= (abs(increase) as u64)) {
    return 0;
  }
  return base + increase;
}
@massaExport()
export function setPrice(): u64 {
  assert(callerHasWriteAccess(), 'Caller is not allowed');

  let currentPrice: u64;
  if (!Storage.has(PRICE_KEY)) {
    // Set initial oracle price
    generateEvent(`Set initial price to ${INIT_PRICE.toString()}`);
    Storage.set(PRICE_KEY, INIT_PRICE.toString());
    currentPrice = INIT_PRICE;
  } else {
    currentPrice = u64.parse(Storage.get(PRICE_KEY));
  }

  const newPrice = generateRandomIncrease(currentPrice);

  Storage.set(PRICE_KEY, newPrice.toString());
  generateEvent(`🎉 Price updated: ${newPrice.toString()}`);

  sendFuturOperation();

  return newPrice;
}

@massaExport()
export function getPrice(): u64 {
  assert(!Storage.has(PRICE_KEY), 'Price is not set');

  const price = u64.parse(Storage.get(PRICE_KEY));
  generateEvent(`current price is ${price.toString()}`);

  return price;
}
