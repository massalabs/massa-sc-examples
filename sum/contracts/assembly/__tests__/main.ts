import { Args } from '@massalabs/as-types';
import * as main from '../contracts/main';

describe('Sum test', () => {
  test('sum', () => {
    const args = new Args();
    args.add(21 as i32);
    args.add(20 as i32);
    expect(new Args(main.sum(args.serialize())).nextI32().unwrap()).toBe(41);
  });
});
