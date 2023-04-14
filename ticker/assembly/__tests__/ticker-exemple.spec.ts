import { Args } from '@massalabs/as-types';
import * as Oracle from '../contracts/oracle';
import { Storage, resetStorage } from '@massalabs/massa-as-sdk';

describe('setPrice test', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
  });
    
  afterAll(() => {
    resetStorage(); // We make sure that the contract's storage is reset.
  });
    
  test('Test initial call', () => {
    const result = (): void => {
      Oracle.setPrice(new Args().serialize());
    };

    expect(result).not.toThrow('Caller is not allowed');
    expect(Storage.has('PRICE_KEY')).toBe(true);

    const price = u64.parse(Storage.get('PRICE_KEY'));
    expect(price).toStrictEqual(10000);
  });

});


describe('getPrice test', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
  });
    
  afterAll(() => {
    resetStorage(); // We make sure that the contract's storage is reset.
  });
    

  test('Test price not set', () => {
    const price = (): void => {Oracle.getPrice(new Args().serialize());};

    expect(price).toThrow('Price is not set');
  });

  test('Test price exists', () => {
    Oracle.setPrice(new Args().serialize());

    const price = Oracle.getPrice(new Args().serialize());
    expect(price).toStrictEqual(new Args().add(10000 as u64).serialize());
  });

});