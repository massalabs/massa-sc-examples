/** ***********************
 * Smart contract containing a message handler function
 **/

import { print } from "massa-sc-std"

export function receive(data: string): void {
    print("message received: " + data);
}
