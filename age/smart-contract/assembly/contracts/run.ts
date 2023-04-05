import { Address, call, callerHasWriteAccess, } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(binnaryArgs: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }
  main(binnaryArgs);
  return [];
}

/**
 * @param _ - not used
 * @returns empty array
 */
export function main(addressS: StaticArray<u8>): StaticArray<u8> {
  const address = new Address (new Args(addressS).nextString().expect("The address of the contract to call is missing !"));
  call(address, 'change_age', new Args().add("alice").add<u32>(32), 0);
  return [];
}
