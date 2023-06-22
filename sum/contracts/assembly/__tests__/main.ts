import * as main from '../contracts/main';

describe('Sum test', () => {
  test('sum', () => {
    expect(main.sum(21, 20)).toBe(41);
  });
});
