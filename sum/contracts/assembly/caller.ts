import { Address, Args, call } from '@massalabs/massa-as-sdk';

export function main(): i32 {
  const address = new Address(
    'A1L23PeTjRarxq3G9uWKXB8Qw67sj57qq1HXiSECNxfaYL6QW6b',
  );
  call(address, 'sum', new Args().add(21 as i32).add(20 as i32), 0);
  return 0;
}
