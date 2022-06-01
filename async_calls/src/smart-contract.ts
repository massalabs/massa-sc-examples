/** ***********************
 * Smart contract containing the message handler function
 **/

import { send_message, print, generate_event, Context, get_current_period } from "massa-sc-std"

export function receive_and_send(data: string): void {
    const response: string = "message received: " + data;
    const current = get_current_period();
    const next = current + 3;
    send_message(Context.get_owned_addresses(), "receive_and_send", current, 0, next, 0, 100_000, 0, 0, "hey, wake up!");
    generate_event(response);
    print(response);
}
