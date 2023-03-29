import { callerHasWriteAccess, generateEvent } from '@massalabs/massa-as-sdk';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }

  // The `generateEvent` function is used to emit an event on the blockchain.
  // In this case, we're emitting an event with the message "Hello, World!".
  generateEvent('Hello, World!');
  return [];
}
