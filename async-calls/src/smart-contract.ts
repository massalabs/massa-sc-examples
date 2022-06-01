/** ***********************
 * Smart contract containing the message handler function
 **/

import { send_message, print, generate_event, Context, get_current_period } from "massa-sc-std"

export function receive_and_send(data: string): void {
    const my_address = Context.get_call_stack()[0];

    const start_p = get_current_period();
    const end_p = start_p + 3;
    send_message(my_address, "receive_and_send", start_p, 0, end_p, 31, 100_000, 0, 0, "hey, wake up!");

    const response: string = "message received: " + data;
    generate_event(response);
    print(response);
}
