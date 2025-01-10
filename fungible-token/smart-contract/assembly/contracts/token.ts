import { u256 } from 'as-bignum/assembly';
import { mrc20Constructor } from '@massalabs/sc-standards/assembly/contracts/MRC20';

export function constructor(_: StaticArray<u8>): void {
  mrc20Constructor('MassaToken', 'MT', 18, u256.fromU64(1010101010));
}

export * from '@massalabs/sc-standards/assembly/contracts/MRC20';
export { mint } from '@massalabs/sc-standards/assembly/contracts/MRC20/mintable';
export {
  burn,
  burnFrom,
} from '@massalabs/sc-standards/assembly/contracts/MRC20/burnable';
export {
  setOwner,
  onlyOwner,
  isOwner,
} from '@massalabs/sc-standards/assembly/contracts/utils/ownership';
