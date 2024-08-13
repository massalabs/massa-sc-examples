// The entry file of your WebAssembly module.
import { Context, generateEvent, Storage } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function constructor(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return [];
  }
  const args = new Args(binaryArgs);

  const message = args
    .nextString()
    .expect('Name argument is missing or invalid');

  Storage.set(stringToBytes('messageKey'), stringToBytes(message));
  generateEvent(`Constructor called with message ${message}`);
  return [];
}

/**
 * This function updates the message stored in the contract storage.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function setMessage(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);

  const message = args
    .nextString()
    .expect('Message argument is missing or invalid');

  Storage.set<string>('messageKey', message);
  generateEvent(`Message updated to ${message}`);
  return [];
}

/**
 * This function returns the message stored in the contract storage.
 */
export function getMessage(): StaticArray<u8> {
  const message = Storage.get<string>('messageKey');
  return stringToBytes(message);
}
