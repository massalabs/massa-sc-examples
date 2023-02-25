// The entry file of your WebAssembly module.
import {
  Address,
  balanceOf,
  callerHasWriteAccess,
  generateEvent,
  transferCoins,
} from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function constructor(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }
  const argsDeser = new Args(binaryArgs);
  const name = argsDeser
    .nextString()
    .expect('Name argument is missing or invalid');
  generateEvent(`Constructor called with name ${name}.`);

  /**
   *  To initialize without html use this part and change the wallet address to the target
   * 
   *  let dest = new Args()
        .add('A12QEkHuWm7ru1MJyGzPRM5CDGETVnJyx8mNKevUJhMEpwWNJYQM')
        .serialize();
      sendCoin(dest);
   */

  return [];
}

/**
 * @param _ - not used
 * @returns the emitted event serialized in bytes
 */

export function sendCoin(args: StaticArray<u8>): StaticArray<u8> {
  // Creating target address

  let addr = new Args(args);
  let targetAddress = new Address(
    addr.nextString().expect('Address argument is missing or invalid'),
  );

  // Specifiyng the amount and sending the coins

  let amount = 1_000_000_000;
  transferCoins(targetAddress, amount);

  // Checking the balance of the target address and the smart contract address

  generateEvent(
    `${amount} coins has been sent. Balance of the target address: ${balanceOf(
      targetAddress.toString(),
    ).toString()}`,
  );
  return [];
}
