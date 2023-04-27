import { NoArg } from '@massalabs/as-types';
import * as Oracle from '../contracts/oracle';
import {
  Storage,
  mockAdminContext,
  resetStorage,
} from '@massalabs/massa-as-sdk';

describe('setPrice test', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
    mockAdminContext(false); // We make sure that the contract's storage is reset.
  });

  afterAll(() => {
    resetStorage();
    mockAdminContext(false); // We make sure that the contract's storage is reset.
  });

  test('Test initial call', () => {
    mockAdminContext(true); // We make sure that the contract's storage is reset.
    const result = (): void => {
      Oracle.setPrice(NoArg.serialize());
    };

    expect(result).not.toThrow('Caller is not allowed');
    expect(Storage.has('PRICE_KEY')).toBe(true);

    const price = u64.parse(Storage.get('PRICE_KEY'));
    expect(price).toBeGreaterThanOrEqual(10000);
  });
});

describe('getPrice test', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
    mockAdminContext(false); // We make sure that the contract's storage is reset.
  });

  afterAll(() => {
    resetStorage(); // We make sure that the contract's storage is reset.
    mockAdminContext(false); // We make sure that the contract's storage is reset.
  });

  test('Test price not set', () => {
    mockAdminContext(true); // We make sure that the contract's storage is reset.
    const price = (): void => {
      Oracle.getPrice(NoArg.serialize());
    };

    expect(price).toThrow('Price is not set');
  });

  test('Test price exists', () => {
    mockAdminContext(true); // We make sure that the contract's storage is reset.
    Oracle.setPrice(NoArg.serialize());

    const price = Oracle.getPrice(NoArg.serialize());
    expect(price).toBeTruthy();
  });
});
