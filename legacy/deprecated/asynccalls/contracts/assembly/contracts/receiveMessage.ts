import { print, generateEvent } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';
/** ***********************
 * Smart contract containing a message handler function
 **/

export function receive(data: StaticArray<u8>): StaticArray<u8> {
  const msg: string = new Args(data)
    .nextString()
    .expect('msg argument is missing or invalid');
  const response: string = `message received: ${msg}`;
  generateEvent(response);
  print(response);
  return [];
}
