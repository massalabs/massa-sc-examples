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

  let name = 'alice';
  let age = 1;

  Storage.set(name, age.toString());

}

/**
 * This functions changes the age of someone by a given name and a given new age value.
 *
 * @remarks
 *  If the entry doesn't exist the person is created.
 *  It also generates an event that indicates the changes that are made.
 *
 * @param name - The given name
 * @param age - Age of the person
 *
 * @returns none
 *
 */
@massaExport()
export function changeAge(name: string, age: u32): void {

  Storage.set(name, age.toString());

  // Here we generate an event that indicates the changes that are made.
  generateEvent("Changed age of '" + name + "' to '" + age.toString() + "'");
}

/**
 * This functions retrieves the age of someone by a given name.
 *
 * @remarks
 *  If the entry doesn't exist the execution is aborted.
 *
 * @param name - The given name
 *
 * @returns The serialized 'age' found.
 *
 */
@massaExport()
export function getAge(name: string): u32 {
  // Then we create our encoded key from the function's argument.

  if (Storage.has(name)) {
    // We check if the entry exists.
    let age = Storage.get(name);
    // We get the associated value and return it.
    // Since the return type of 'Storage.get' is 'StaticArray<u8>' it is already serialized.
    return u32.parse(age);
  } else {
    // If the entry doesn't exist we abort the execution.
    abort("No such person's age is stored.");
    // We still need to return due AssemblyScript compiler.
    return 0;
  }
}