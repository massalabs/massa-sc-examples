import { Args, bytesToString } from '@massalabs/as-types';
import { changeAge, constructor, getAge } from '../contracts/main';
import { mockAdminContext, resetStorage } from '@massalabs/massa-as-sdk';
const name = 'alice';
const age: u32 = 42;

describe('constructor tests', () => {
  test('Storage correctly initialized', () => {
    mockAdminContext(true);
    constructor([]);
    const result = getAge(new Args().add(name).serialize());
    expect(bytesToString(result)).toStrictEqual('1');
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
      changeAge(new Args().add(name).add(age).serialize());
    };

    expect(result).not.toThrow('Missing name argument.');
    expect(result).not.toThrow('Missing age argument.');
  });

  test('Name missing', () => {
    const call = (): void => changeAge(new Args().add(age).serialize());
    expect(call).toThrow('Missing name argument.');
  });

  test('Age missing', () => {
    const call = (): void => changeAge(new Args().add(name).serialize());
    expect(call).toThrow('Missing age argument.');
  });
});

describe('getAge tests', () => {
  test('Name not exists', () => {
    const call = (): void => changeAge(new Args().add(name).serialize());
    expect(call).toThrow('No age found for ' + name);
  });

  test('Name exists', () => {
    changeAge(new Args().add(name).add(age).serialize());
    const result = getAge(new Args().add(name).serialize());
    expect(bytesToString(result)).toStrictEqual(age.toString());
  });
});
