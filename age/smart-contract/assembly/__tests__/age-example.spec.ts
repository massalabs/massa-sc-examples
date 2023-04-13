import { Args } from '@massalabs/as-types';
import { changeAge, constructor, getAge } from '../contracts/main';
import { resetStorage } from '@massalabs/massa-as-sdk';

describe('changeAge tests', () => {
  beforeEach(() => {
    resetStorage(); // We make sure that the contract's storage is empty before each test.
  });

  afterAll(() => {
    resetStorage(); // We make sure that the contract's storage is reset.
  });

  test('Arguments ok', () => {
    const result = (): void => {
      changeAge(
        new Args()
          .add('alice')
          .add(42 as u32)
          .serialize(),
      );
    };

    expect(result).not.toThrow('Missing name argument.');
    expect(result).not.toThrow('Missing age argument.');
  });

  test('Name missing', () => {
    const result = (): void => {
      changeAge(new Args().add(42 as u32).serialize());
    };

    expect(result).toThrow('Missing name argument.');
  });

  test('Age missing', () => {
    const result = (): void => {
      changeAge(new Args().add('alice').serialize());
    };

    expect(result).toThrow('Missing age argument.');
  });
});

describe('getAge tests', () => {
  test('Name not exists', () => {
    const result = getAge(new Args().add('alice').serialize());

    expect(result).toStrictEqual([]);
  });

  test('Name exists', () => {
    changeAge(
      new Args()
        .add('alice')
        .add(42 as u32)
        .serialize(),
    );
    const result = getAge(new Args().add('alice').serialize());

    expect(result).toStrictEqual(new Args().add(42 as u32).serialize());
  });
});

describe('constructor tests', () => {
  test('test access control denied', () => {
    const result = constructor(
      new Args().add('A31242RFFFZ32R23F1SDF').serialize(),
    );

    expect(result).toStrictEqual([]);

    const result2 = getAge(new Args().add('alice').serialize());

    expect(result2).toStrictEqual([]);
  });
});
