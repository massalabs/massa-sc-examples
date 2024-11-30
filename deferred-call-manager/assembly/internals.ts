import {
  Args,
  bytesToU64,
  stringToBytes,
  u64ToBytes,
} from '@massalabs/as-types';
import {
  balance,
  Context,
  deferredCallCancel,
  deferredCallExists,
  deferredCallQuote,
  deferredCallRegister,
  findCheapestSlot,
  generateEvent,
  Storage,
} from '@massalabs/massa-as-sdk';
import { History } from './serializable/history';

export const NEXT_CALL_ID_KEY = 'callId';
export const HISTORY_KEY = stringToBytes('hist');
export const TASK_COUNT_KEY = stringToBytes('idx');

export function registerCall(period: u64): void {
  const initBal = balance();
  generateEvent('Current contract balance: ' + initBal.toString());

  const maxGas = 20_000_000;
  const params_size = 0;
  const bookingPeriod = Context.currentPeriod() + period;
  const slot = findCheapestSlot(bookingPeriod, bookingPeriod, maxGas, params_size);

  const cost = deferredCallQuote(slot, maxGas, params_size);
  const callId = deferredCallRegister(
    Context.callee().toString(),
    'processTask',
    slot,
    maxGas,
    new Args().add(period).serialize(),
    // No need to provide coins as processTask is internal function
    0,
  );

  const bookingCost = initBal - balance();

  Storage.set(NEXT_CALL_ID_KEY, callId);
  generateEvent(
    `Deferred call registered. id: ${callId}. Booked slot period: ${bookingPeriod.toString()}.\
     Booking cost: ${bookingCost.toString()}, quote: ${cost.toString()}`,
  );
}

function getTaskIndex(): u64 {
  return bytesToU64(Storage.get(TASK_COUNT_KEY));
}

function getHistoryKey(taskIndex: u64): StaticArray<u8> {
  return HISTORY_KEY.concat(u64ToBytes(taskIndex));
}

export function processTask(binArgs: StaticArray<u8>): void {
  assert(
    Context.callee() === Context.caller(),
    'The caller must be the contract itself',
  );

  const taskIndex = getTaskIndex();
  const callId = Storage.get(NEXT_CALL_ID_KEY);

  generateEvent(`Processing task ${taskIndex}. Call id : ${callId}`);

  // Save execution history
  const key = getHistoryKey(taskIndex);
  Storage.set(
    key,
    new History(
      Context.currentPeriod(),
      Context.currentThread(),
      callId,
    ).serialize(),
  );

  // Increment task index
  Storage.set(TASK_COUNT_KEY, u64ToBytes(taskIndex + 1));

  const period = new Args(binArgs).nextU64().expect('Unable to decode period');
  registerCall(period);
}

export function cancelCall(callId: string): void {
  if (deferredCallExists(callId)) {
    deferredCallCancel(callId);
    generateEvent('Deferred call canceled. id : ' + callId);
  } else {
    generateEvent('Deferred call does not exist. id: ' + callId);
  }
}
