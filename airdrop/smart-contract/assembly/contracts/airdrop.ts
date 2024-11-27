import { Address, generateEvent, Storage } from '@massalabs/massa-as-sdk';
import { bytesToU32, stringToBytes, u32ToBytes } from '@massalabs/as-types';
import { u256 } from 'as-bignum/assembly';
import { addressList } from '../const/addressList';
import { mrc20Address } from '../const/mrc20-address';
import { TokenWrapper } from '@massalabs/sc-standards/assembly/contracts/FT';
import { getBalanceEntryCost } from '@massalabs/sc-standards/assembly/contracts//FT/token-external';

const VERSION_KEY = stringToBytes('airdrop_version'); // Key to store the version of the airdrop
const VERSION = u32(1); // Increment this number to run the airdrop again
const AIRDROP_LIMIT = 850; // Maximum number of transfers per block

export const MRC20_ADDRESS = new Address(mrc20Address);

/** Update this value to the amount you wish to airdrop at each account */
const TOKEN_AMOUNT = 20; // Amount of tokens to airdrop

/**
 * Main function to run the airdrop. Will be automatically called when executing the contract.
 */
export function main(_: StaticArray<u8>): void {
  checkAndSetAirdropVersion(); // Can be removed if you know what you are doing
  validateAddressLimit();

  const coin = new TokenWrapper(MRC20_ADDRESS);
  const decimals = coin.decimals();

  const amount = u256.fromU64(TOKEN_AMOUNT) * u256.fromU64(10 ** decimals);

  for (let i = 0; i < addressList.length; i++) {
    const cost = getBalanceEntryCost(mrc20Address, addressList[i]);
    generateEvent(cost.toString());
    coin.transfer(new Address(addressList[i]), amount, cost);
  }

  generateEvent('Airdrop done');
}

function checkAndSetAirdropVersion(): void {
  const previousVersion = Storage.has(VERSION_KEY)
    ? bytesToU32(Storage.get(VERSION_KEY))
    : 0;

  assert(
    VERSION > previousVersion,
    `Airdrop already done for version ${VERSION}, please increase version number to ${
      previousVersion + 1
    }`,
  );

  Storage.set(VERSION_KEY, u32ToBytes(VERSION));
}

function validateAddressLimit(): void {
  assert(
    addressList.length <= AIRDROP_LIMIT,
    'Too many addresses. The number of transfers exceeds the block limit.',
  );
}
