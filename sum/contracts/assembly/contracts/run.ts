import { Address, Storage, call } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';
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
  const args = new Args(sumAddress);
  Storage.set(
    'address',
    args.nextString().expect('Argument address is missing or invalid'),
  );
  main([]);
  return;
}

/**
 * Test the 'sum' function of the 'sum' contract by calling it with 2 i32.
 *
 * @param _ - not used
 * @returns empty array
 */
export function main(_: StaticArray<u8>): void {
  const address = new Address(Storage.get('address'));
  const a: i64 = 2;
  const b: i64 = 3;
  const values = new Args().add(a).add(b);
  call(address, 'sum', values, 5000000);
  return;
}
