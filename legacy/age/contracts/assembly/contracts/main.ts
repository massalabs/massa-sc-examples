/**
 * This file is a smart contract that enables you to store and retrieve the age of a person by their name.
 *
 * @remarks
 * The smart contract is written in AssemblyScript and executed on the Massa blockchain.
 *
 * The contract has three functions:
 *
 * - The constructor sets up the storage by creating an initial entry for a person with a default age value.
 *  This function is always called once on contract deployment.
 *
 * - The change_age function allows you to update a person's age by providing their name and a new age value.
 *  If the entry for the given name does not exist, the person is created.
 *  This function generates an event that indicates the changes that are made.
 *
 * - The get_age function retrieves the age of a person by their name.
 *  If the entry for the given name does not exist, the execution is aborted.
 *  This function returns the serialized 'age' found, and generates an event that indicates the retrieval.
 *
 * The smart contract interacts with the Massa blockchain using the massa-as-sdk,
 * which provides functions for storage, access control, event generation and more.
 * @see [massa-as-sdk](https://github.com/massalabs/massa-as-sdk)
 *
 */
import { Args, stringToBytes } from '@massalabs/as-types';
import {
  Storage,
  callerHasWriteAccess,
  generateEvent,
} from '@massalabs/massa-as-sdk';

/**
 * This function is the constructor, it is always called once on contract deployment.
 * In this case, the constructor is adding a person
 * named 'alice' with an age of 1 as default first entry in the Storage.
 *
 * @param args - The serialized arguments (unused).
 *
 * @returns none
 *
 */
export function constructor(_: StaticArray<u8>): void {
  if (!callerHasWriteAccess()) {
    // First we check if the caller (in this case you when you deploy the contract) has write access on storage.
    return;
  }

  let name = 'alice'; // We create our 'name' key for the person's entry.
  let age = 1; // We create our 'age' value for the person's entry.

  Storage.set(name, age.toString()); // Then we store the key/value pair.
}

/**
 * This functions changes the age of someone by a given name and a given new age value.
 *
 * @remarks
 *  If the entry doesn't exist the person is created.
 *  It also generates an event that indicates the changes that are made.
 *
 * @param _args - The serialized arguments that should contain 'name' and 'age'.
 *
 * @returns none
 *
 */
export function changeAge(_args: StaticArray<u8>): void {
  let args = new Args(_args); // First we deserialize our arguments.

  // We use 'next[Type]()' to retrieve the next argument in the serialized arguments.
  let name = args.nextString().expect('Missing name argument.');
  // We use 'expect()' to check if the argument exists, if not we abort the execution.
  let age = args.nextU32().expect('Missing age argument.');

  // Key and value must be the same type
  Storage.set(name, age.toString()); // Then we store the key/value pair.

  // Here we generate an event that indicates the changes that are made.
  generateEvent("Changed age of '" + name + "' to '" + age.toString() + "'");
}

/**
 * This functions retrieves the age of someone by a given name.
 *
 * @remarks
 *  If the entry doesn't exist the execution is aborted.
 *
 * @param args - The serialized arguments that should contain 'name'.
 *
 * @returns The serialized 'age' found.
 *
 */
export function getAge(_args: StaticArray<u8>): StaticArray<u8> {
  let args = new Args(_args); // First we deserialize our arguments.

  // Use 'expect()' to check if the argument exists, if not it abort the execution.
  let name = args.nextString().expect('Missing name argument.');

  // Check if the entry exists.
  if (!Storage.has(name)) throw new Error('No age found for ' + name);
  // Get the age value from the storage.
  let age = Storage.get(name);
  // Return the serialized age value. We could have used Args to serialize the value.
  return stringToBytes(age);
}
