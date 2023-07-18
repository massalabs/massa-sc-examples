import { sum } from '../contracts/sum';

describe('sum tests', () => {
  test('sum ok', () => {
    const result = sum(2, 42);

    expect(result).toStrictEqual(44);
  });
});
