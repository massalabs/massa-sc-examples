import { bytesToU64 } from '@massalabs/as-types';
import {
  constructor,
  getPrice,
  updatePrice,
} from '../contracts/autonomousprice';
import { mockAdminContext, resetStorage } from '@massalabs/massa-as-sdk';

describe('Autonomous price tests', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
  });

  test('Price update', () => {
    mockAdminContext(true);
    constructor([]);
    const result = getPrice([]);
    expect(bytesToU64(result)).toStrictEqual(100000);
  });

  test('Price update', () => {
    mockAdminContext(true);
    constructor([]);
    const result = updatePrice([]);
    // Result should be different from 1000 in most cases. It can be equal to 1000 but it's very unlikely.
    // This test is for example purpose only.
    expect(bytesToU64(result)).not.toStrictEqual(100000);
  });
});
