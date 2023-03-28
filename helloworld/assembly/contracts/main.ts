import { generateEvent } from '@massalabs/massa-as-sdk';

// The `main` function is the entry point for smart contracts in AssemblyScript.
// It takes a static array of bytes as its argument, but in this case we're ignoring it since we don't need it.
export function main(_: StaticArray<u8>): void {
  // The `generateEvent` function is used to emit an event on the blockchain.
  // In this case, we're emitting an event with the message "Hello, World!".
  generateEvent('Hello, World!');
}
