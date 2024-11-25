import { Address, call, generateEvent, Storage } from '@massalabs/massa-as-sdk';
import {
  Args,
  bytesToU32,
  byteToU8,
  stringToBytes,
  u32ToBytes,
} from '@massalabs/as-types';
import { u256 } from 'as-bignum/assembly';
import { addressList } from '../const/addressList';
import { mrc20Address } from '../const/mrc20-address';
export * from '@massalabs/sc-standards/assembly/contracts/FT/token';

const VERSION_KEY = stringToBytes('airdrop_version'); // Key to store the version of the airdrop
const VERSION = u32(1); // Increment this number to run the airdrop again
const TOKEN_AMOUNT = 20; // Amount of tokens to airdrop
const AIRDROP_LIMIT = 850; // Maximum number of transfers per block
const TRANSFER_COST = 9600000; // Cost of a transfer
export const MRC20_ADDRESS = new Address(mrc20Address);

/**
 * Main function to run the airdrop. Will be automatically called when executing the contract.
 */
export function main(_: StaticArray<u8>): void {
  checkAndSetAirdropVersion();
  validateAddressLimit();

  const decimals = byteToU8(call(MRC20_ADDRESS, 'decimals', new Args(), 0));

  // @ts-ignore
  const amount = u256.fromU64(TOKEN_AMOUNT) * u256.fromU64(10 ** decimals);

  for (let i = 0; i < addressList.length; i++) {
    call(
      MRC20_ADDRESS,
      'transfer',
      new Args().add(addressList[i]).add(amount),
      TRANSFER_COST,
    );
  }

  generateEvent('Airdrop done');
}

function checkAndSetAirdropVersion(): void {
  const previousVersion = Storage.has(VERSION_KEY)
    ? bytesToU32(Storage.get(VERSION_KEY))
    : u32.MIN_VALUE;

  assert(
    VERSION > previousVersion,
    `Airdrop already done for version ${VERSION}, please increase version number`,
  );

  Storage.set(VERSION_KEY, u32ToBytes(VERSION));
}

function validateAddressLimit(): void {
  assert(
    addressList.length <= AIRDROP_LIMIT,
    'Too many addresses. The number of transfers exceeds the block limit.',
  );
}
