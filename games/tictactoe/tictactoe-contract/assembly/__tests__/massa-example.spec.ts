import { stringToBytes } from '@massalabs/as-types';
import { event } from '../contracts/main';

describe('Group test', () => {
  test('Testing event', () => {
    expect(event([])).toStrictEqual(stringToBytes("I'm an event!"));
  });
});
