import { Args, i32ToBytes, stringToBytes } from '@massalabs/as-types';
import { Storage, generateEvent } from '@massalabs/massa-as-sdk';

function add(a: i32, b: i32): i32 {
  return a + b;
}

export function sum(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const a = args.nextI32().expect('Argument a is missing or invalid');
  const b = args.nextI32().expect('Argument b is missing or invalid');
  const result = add(a, b);
  generateEvent(
    `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes('last result'), i32ToBytes(result));
  return i32ToBytes(result);
}
