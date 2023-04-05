import { Address, Storage, call, callerHasWriteAccess } from '@massalabs/massa-as-sdk';
import { NoArg, Args } from '@massalabs/as-types';


/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(sumAddress: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }
  const args = new Args(sumAddress);
  Storage.set('address', args.nextString().expect('Argument address is missing or invalid'));
  main([]);
  return [];
}

/**
 * @param _ - not used
 * @returns empty array
 */
export function main(_: StaticArray<u8>): StaticArray<u8> {
  const address = new Address(Storage.get('address'));
  const a:i32 = 2;
  const b:i32 = 3; 
  const values = new Args()
  .add(a)
  .add(b);
  call(address, 'sum', values, 5000000);
  return [];
}
