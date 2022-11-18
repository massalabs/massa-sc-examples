/** ***********************
 * Smart contract containing a message handler function
 **/

import { print, generateEvent } from "@massalabs/massa-as-sdk"

export function receive(data: string): void {
    let response: string = "message received: " + data;
    generateEvent(response);
    print(response);
}
