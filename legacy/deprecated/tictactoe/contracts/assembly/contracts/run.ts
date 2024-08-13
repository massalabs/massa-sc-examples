import {
  Address,
  call,
  callerHasWriteAccess,
  Storage,
} from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param tictactoeAddress -The address of the smart contract deployed in the previous step
 */
export function constructor(
  tictactoeAddress: StaticArray<u8>,
): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }
  const args = new Args(tictactoeAddress);
  Storage.set(
    'address',
    args.nextString().expect('Argument address is missing or invalid'),
  );
  main([]);
  return [];
}

/**
 * @param _ - not used
 * @returns empty array
 */
export function main(_: StaticArray<u8>): StaticArray<u8> {
  const address = new Address(Storage.get('address'));
  call(address, 'play', new Args().add(u32(3)), 500000);
  return [];
}
