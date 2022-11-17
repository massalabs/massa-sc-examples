// The entry file of your WebAssembly module.
import { generateEvent } from '@massalabs/massa-as-sdk';

export function main(): void {
	generateEvent("Hello, World!");
}
