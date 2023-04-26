import { Args, bytesToI32 } from '@massalabs/as-types';
import { sum } from '../contracts/main';

describe('Testing sum contract', () => {
  test('sum 1 + 1', () => {
    const args = new Args();
    args.add(1);
    args.add(1);
    expect(bytesToI32(sum(args.serialize()))).toStrictEqual(2);
  });

  test('sum 2 - 1', () => {
    const args = new Args();
    args.add(2);
    args.add(-1);
    expect(bytesToI32(sum(args.serialize()))).toStrictEqual(1);
  });

  itThrows('sum 1 + abc', () => {
    expect((): void => {
      const args = new Args();
      args.add(1);
      args.add('abc' as string);
      sum(args.serialize());
    }).toThrow('Argument b is missing or invalid');
  });
});
