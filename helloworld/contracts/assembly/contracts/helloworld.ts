// The entry file of your WebAssembly module.
import { Context, generateEvent } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param args - The arguments to the constructor containing the message to be logged
 */
export function constructor(_: StaticArray<u8>): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return;
  }
}

export function helloWorld(args: StaticArray<u8>): void {
  const message = new Args(args).nextString().unwrap();
  // The `generateEvent` function is used to emit an event on the blockchain.
  // In this case, we're emitting an event with the message that was passed to the constructor.
  generateEvent(message);
}
