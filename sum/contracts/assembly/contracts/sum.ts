import { generateEvent, Storage } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes, i32ToBytes } from '@massalabs/as-types';

/**
 * @param a - first i32
 * @param b - second i32
 * @returns Sum of a and b
 */
function add(a: u32, b: u32): u32 {
  return a + b;
}

/**
 * This function sums 2 u32 and returns the result.
 * It also generates an event resuming the operation and save the last result in the blockchain.
 *
 * @param binaryArgs - the 2 u32 we want to sum serialized in bytes
 *
 * @returns the sum of the 2 u32 serialized in bytes
 */
export function sum(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const a = args.nextI32().expect('Argument a is missing or invalid');
  const b = args.nextI32().expect('Argument b is missing or invalid');
  const result = add(a, b);
  generateEvent(
    `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes('lastResult'), i32ToBytes(result));
  return i32ToBytes(result);
}

/**
 * @returns the last result of the sum function serialized in bytes
 */
export function lastResult(): StaticArray<u8> {
  return Storage.get(stringToBytes('lastResult'));
}
