import { Args, stringToBytes } from '@massalabs/as-types';
import { change_age, get_age, constructor } from '../contracts/main';

describe('changeAge tests', () => {
  test('Arguments ok', () => {
    const result = (): void => {
      change_age(
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
      change_age(new Args().add(42 as u32).serialize());
    };

    expect(result).toThrow('Missing name argument.');
  });

  test('Age missing', () => {
    const result = (): void => {
      change_age(new Args().add('alice').serialize());
    };

    expect(result).toThrow('Missing age argument.');
  });
});

describe('getAge tests', () => {
  test('Name not exists', () => {
    const result = get_age(new Args().add('Mr.Nobody').serialize());

    expect(result).toStrictEqual([]);
  });

  test('Name exists', () => {
    change_age(
      new Args()
        .add('alice')
        .add(42 as u32)
        .serialize(),
    );
    const result = get_age(new Args().add('alice').serialize());

    expect(result).toStrictEqual(
      new Args()
        .add(4)
        .add(42 as u32)
        .serialize(),
    );
  });
});

describe('constructor tests', () => {
  test('Testing event', () => {});
});
