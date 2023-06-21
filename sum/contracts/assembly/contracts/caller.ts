import { Args, bytesToI32 } from '@massalabs/as-types';
import {
  Address,
  call,
  callerHasWriteAccess,
  generateEvent,
} from '@massalabs/massa-as-sdk';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 */
@massaExport()
export function constructor(addr: string): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) return;
  main(addr);
}

@massaExport()
export function main(addr: string): i32 {
  const address = new Address(addr);
  const binaryResult = call(
    address,
    'sum',
    new Args().add(21 as i32).add(20 as i32),
    100_000_000,
  );
  const result = bytesToI32(binaryResult);
  generateEvent('result from the contract ' + result.toString());
  return result;
}
