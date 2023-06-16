import { Address, call, callerHasWriteAccess } from '@massalabs/massa-as-sdk';
import { NoArg } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }
  main([]);
  return [];
}

/**
 * @param _ - not used
 * @returns empty array
 */
export function main(_: StaticArray<u8>): StaticArray<u8> {
  const address = new Address(
    'A1AVtNgMMEJMBpUniiHC9vfSHjVib3PUfKn6s4ps8NyakPxwWYj',
  );
  call(address, 'event', NoArg, 0);
  return [];
}
