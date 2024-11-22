import { Address, call, Storage } from '@massalabs/massa-as-sdk';
import {
  Args,
  bytesToU32,
  stringToBytes,
  u32ToBytes,
} from '@massalabs/as-types';
import { u256 } from 'as-bignum/assembly';
import { addressList } from './addressList';
import { mrc20Address } from './mrc20-address';
export * from '@massalabs/sc-standards/assembly/contracts/FT/token';

const VERSION_KEY = stringToBytes('version'); // Key to store the version of the airdrop
const VERSION = 0; // Increment this number to run the airdrop again
const TOKEN_AMOUNT = 20; // Amount of tokens to airdrop
const TOKEN_DECIMALS = 18; // Number of decimals of the token
const AIRDROP_LIMIT = 850; // Maximum number of transfers per block
const TRANSFER_COST = 9600000; // Cost of a transfer

export const MRC20_ADDRESS = new Address(mrc20Address);

export const AMOUNT_TO_AIRDROP =
  // @ts-ignore
  u256.fromU64(TOKEN_AMOUNT) * u256.fromU64(10 ** TOKEN_DECIMALS);

/**
 * Main function to run the airdrop. Will be automatically called when executing the contract.
 */
export function main(_: StaticArray<u8>): void {
  assertIsNewVersion();
  assertNbAddressesLimit();

  for (let i = 0; i < addressList.length; i++) {
    call(
      MRC20_ADDRESS,
      'transfer',
      new Args().add(addressList[i]).add(AMOUNT_TO_AIRDROP),
      TRANSFER_COST,
    );
  }

  // Allow to prevent to accidentally run the airdrop again
  Storage.set(VERSION_KEY, u32ToBytes(VERSION));
}

function assertIsNewVersion(): void {
  assert(
    bytesToU32(Storage.get(VERSION_KEY)) != VERSION,
    ` Airdrop already done for version ${VERSION} please update version number`,
  );
}

function assertNbAddressesLimit(): void {
  assert(
    addressList.length <= AIRDROP_LIMIT,
    'Too many addresses. The number of transfers exceeds the block limit.',
  );
}
