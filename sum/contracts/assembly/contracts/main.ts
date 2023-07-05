import { Args, bytesToString, i32ToBytes, stringToBytes } from '@massalabs/as-types';
import { Context, Storage, generateEvent } from '@massalabs/massa-as-sdk';
import { getOf } from '@massalabs/massa-as-sdk/assembly/std/storage';
import { event } from './helpers/eventCaller';

function add(a: i32, b: i32): i32 {
  return a + b;
}

export function constructor(_: StaticArray<u8>): void
{
  const arr = getOf(Context.callee(), stringToBytes("protoMassa"));
  generateEvent(bytesToString(arr));
  sum(1, 2);
}

@massaExport()
export function sum(a: i32, b: i32): i32 {
  const result = add(a, b);
  const msg = `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`;
  generateEvent(
    `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes('last result'), i32ToBytes(result));
  const evRes = event(result, msg, 2, 0 as u64);
  generateEvent("event result: "+evRes.toString());
  return result;
}
