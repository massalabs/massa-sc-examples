import {
  Args,
  bytesToI64,
  bytesToString,
  stringToBytes,
} from '@massalabs/as-types';
import { Address, Storage, generateEvent } from '@massalabs/massa-as-sdk';
import { isDeployingContract } from '@massalabs/massa-as-sdk/assembly/std/context';

/**
 * This function is meant to be called only one time: when the contract is deploying.
 *
 * @param sumAddress - The address of the sum contract we want to interact with.
 */
export function constructor(sumAddress: StaticArray<u8>): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!isDeployingContract) {
    return;
  }

  const result = Storage.getOf(
    new Address('AS12YrZxFisWZCKJpXLEYfSYzrSCS4bjoyKGeaviQMmb5zqfgXaML'),
    stringToBytes('lastResult'),
  );

  generateEvent(bytesToI64(result).toString());

  return;
}
