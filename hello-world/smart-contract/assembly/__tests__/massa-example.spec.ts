import { Args, bytesToString, stringToBytes } from '@massalabs/as-types';
import { constructor, setMessage, getMessage } from '../contracts/main';
import {
  Address,
  resetStorage,
  setDeployContext,
} from '@massalabs/massa-as-sdk';

const USER1_ADDRESS = new Address(
  'AU12UBnqTHDQALpocVBnkPNy7y5CndUJQTLutaVDDFgMJcq5kQiKq',
);

describe('Hello world', () => {
  beforeEach(() => {
    // Remove all data from the data store
    resetStorage();
    // Needed to call the constructor function
    setDeployContext(USER1_ADDRESS.toString());
    constructor(new Args().add<string>('Massa test').serialize());
  });

  test('Update message', () => {
    // Here we use Args object to serialize the message
    setMessage(new Args().add<string>('Hello, world!').serialize());
    const message = getMessage();
    expect(message).toStrictEqual(stringToBytes('Hello, world!'));
  });

  test('Get message', () => {
    const message = getMessage();
    // Because the function returns a StaticArray<u8>, we need to convert it to a string
    expect(bytesToString(message)).toStrictEqual('Massa test');
  });
});
