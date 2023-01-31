import { print } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';
/** ***********************
 * Smart contract containing a message handler function
 **/
import { generateEvent } from '@massalabs/massa-as-sdk';

export function receive(data: StaticArray<u8>): StaticArray<u8> {
  const response: string =
    'message received: ' +
    new Args(data).nextString().expect('data argument is missing or invalid');
  generateEvent(response);
  print(response);
  return [];
}
