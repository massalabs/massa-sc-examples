import { Args, bytesToI32 } from '@massalabs/as-types';
import {
  Address,
  call,
  callerHasWriteAccess,
  generateEvent,
} from '@massalabs/massa-as-sdk';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 */
export function constructor(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }
  main(binaryArgs);
  return [];
}

export function main(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const address = new Address(
    new Args(binaryArgs)
      .nextString()
      .expect('Address argument is missing or invalid'),
  );
  const binaryResult = call(
    address,
    'sum',
    new Args().add(21 as i32).add(20 as i32),
    0,
  );
  const result = bytesToI32(binaryResult);
  generateEvent('result from the contract ' + result.toString());
  return binaryResult;
}
