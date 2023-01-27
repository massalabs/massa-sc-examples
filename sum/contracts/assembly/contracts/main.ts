import { Args } from '@massalabs/as-types';
import { generateEvent } from '@massalabs/massa-as-sdk';

function add(a: i32, b: i32): i32 {
  return a + b;
}

export function sum(_args: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(_args);
  const a = args.nextI32().expect('Argument a is missing or invalid');
  const b = args.nextI32().expect('Argument b is missing or invalid');
  const result = add(a, b);
  generateEvent(
    `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  return new Args().add(result).serialize();
}
