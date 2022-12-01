/** ***********************
 * Smart contract containing a message handler function
 **/

import { print, generateEvent, fromBytes } from "@massalabs/massa-as-sdk"

export function receive(data: StaticArray<u8>): void {
    let response: string = "message received: " + fromBytes(data);
    generateEvent(response);
    print(response);
}
