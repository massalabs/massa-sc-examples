import { generateEvent, Storage } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes, SafeMath, u64ToBytes } from '@massalabs/as-types';

export function constructor(protoFiles: StaticArray<u8>): void {
  // save the proto files in the storage
  Storage.set(stringToBytes('protoMassa'), protoFiles);
}

/**
 * Sums 2 i64 using the SafeMath library and returns the result.
 *
 * @param a - first i64
 * @param b - second i64
 * @returns Sum of a and b
 */
function add(a: u64, b: u64): u64 {
  return SafeMath.add(a, b);
}

/**
 * This function sums 2 i64 and returns the result.
 * It also generates an event resuming the operation and save the last result in the blockchain.
 *
 * @param binaryArgs - the 2 u64 we want to sum serialized in bytes
 *
 * @returns the sum of the 2 u64 serialized in bytes
 */
export function sum(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const a = args.nextU64().expect('Argument a is missing or invalid');
  const b = args.nextU64().expect('Argument b is missing or invalid');
  const result = add(a, b);
  generateEvent(
    `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes('lastResult'), u64ToBytes(result));
  return u64ToBytes(result);
}

/**
 * @returns the last result of the sum function serialized in bytes
 */
export function lastResult(): StaticArray<u8> {
  return Storage.get(stringToBytes('lastResult'));
}
