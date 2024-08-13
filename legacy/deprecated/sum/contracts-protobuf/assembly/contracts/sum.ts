import { generateEvent, Storage } from '@massalabs/massa-as-sdk';
import {
  stringToBytes,
  SafeMath,
  u64ToBytes,
  bytesToU64,
} from '@massalabs/as-types';

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
// @ts-ignore: decorator
@massaExport()
export function sum(a: u64, b: u64): u64 {
  const result = add(a, b);
  generateEvent(
    `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes('lastResult'), u64ToBytes(result));
  return result;
}

/**
 * @returns the last result of the sum function serialized in bytes
 */
// @ts-ignore: decorator
@massaExport()
export function lastResult(): u64 {
  return bytesToU64(Storage.get(stringToBytes('lastResult')));
}
