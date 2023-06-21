import { print } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';
/** ***********************
 * Smart contract containing a message handler function
 **/
import { generateEvent } from '@massalabs/massa-as-sdk';

@massaExport()
export function receive(msg: string): void {
  const response: string = `message received: ${msg}`;
  generateEvent(response);
  print(response);
}
