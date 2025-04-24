import {
  Context,
  generateEvent,
  Storage,
  asyncCall,
  Slot,
} from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';

// Constants for asyncCall gas and fee
const ASYNC_CALL_GAS: u64 = 2100_000;
const ASYNC_CALL_FEE: u64 = 1;
const MSG_KEY = 'messageKey';
/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function constructor(binaryArgs: StaticArray<u8>): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) return;

  const args = new Args(binaryArgs);

  const message = args
    .nextString()
    .expect('Name argument is missing or invalid');

  Storage.set(MSG_KEY, message);
  generateEvent(`Constructor called with message ${message}`);
}

/**
 * This function auto triggers itself asynchronously,
 * it will call itself every 2 periods.
 */
export function asyncHello(): void {
  generateEvent(`Hello friend!`);

  const currentPeriod = Context.currentPeriod();
  const currentThread = Context.currentThread();

  // Schedule the async call for 2 periods in the future
  const startSlot = new Slot(currentPeriod + 2, currentThread);
  const endSlot = new Slot(currentPeriod + 3, currentThread);

  asyncCall(
    Context.callee(), // target: the current contract
    'asyncHello', // functionName: the function to call asynchronously
    startSlot, // startSlot: the slot when the call becomes valid
    endSlot, // endSlot: the slot when the call expires
    ASYNC_CALL_GAS, // maxGas: maximum gas for the call
    ASYNC_CALL_FEE, // rawFee: fee for the call
  );

  generateEvent(
    `Next call scheduled for period ${startSlot.period} thread ${startSlot.thread}`,
  );
}


/**
 * This function updates the message stored in the contract storage.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function setMessage(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);

  const message = args
    .nextString()
    .expect('Message argument is missing or invalid');

  Storage.set<string>(MSG_KEY, message);
  generateEvent(`Message updated to ${message}`);
}

/**
 * This function returns the message stored in the contract storage.
 */
export function getMessage(): StaticArray<u8> {
  return Storage.get(stringToBytes(MSG_KEY));
}
