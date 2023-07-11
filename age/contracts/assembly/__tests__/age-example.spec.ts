import { Args } from '@massalabs/as-types';
import { changeAge, constructor, getAge } from '../contracts/main';
import { Storage, resetStorage } from '@massalabs/massa-as-sdk';


describe('constructor tests', () => {
  test('Storage correctly initialized', () => {
    constructor(new Args().add('A31242RFFFZ32R23F1SDF').serialize());
    if(!Storage.has('alice')){
      changeAge('alice', 1);
    }

    const result = getAge('alice');

    expect(result).toStrictEqual(1);
  });
});

describe('changeAge tests', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
  });

  afterAll(() => {
    resetStorage(); // We make sure that the contract's storage is reset.
  });

  test('Arguments ok', () => {
    const result = (): void => {
      changeAge('alice', 42);
    };

    expect(result).not.toThrow('Missing name argument.');
    expect(result).not.toThrow('Missing age argument.');
  });
});

describe('getAge tests', () => {
  test('Name not exists', () => {
    const result = getAge('alice');

    expect(result).toStrictEqual(0);
  });

  test('Name exists', () => {
    changeAge('alice', 42);
    const result = getAge('alice');

    expect(result).toStrictEqual(42);
  });
});