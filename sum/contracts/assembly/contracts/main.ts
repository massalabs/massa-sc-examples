import { i32ToBytes, stringToBytes } from '@massalabs/as-types';
import { Storage, generateEvent } from '@massalabs/massa-as-sdk';

function add(a: i32, b: i32): i32 {
  return a + b;
}

@massaExport()
export function sum(a: i32, b: i32): i32 {
  const result = add(a, b);
  generateEvent(
    `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes('last result'), i32ToBytes(result));
  return result;
}
