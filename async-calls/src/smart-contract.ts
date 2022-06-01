/** ***********************
 * Smart contract containing the message handler function
 **/

import { send_message, print, generate_event, get_current_period, Context, Storage } from "massa-sc-std"

export function receive_and_send(data: string): void {
    const call_stack = Context.get_call_stack();
    const current_address = call_stack[call_stack.length - 1];

    let age: number = parseInt(Storage.get_data_or_default("age", "0")) + 1;
    Storage.set_data("age", age.toString());

    const start_p = get_current_period() + 1;
    const end_p = start_p + 5;
    send_message(current_address, "receive_and_send", start_p, 0, end_p, 31, 100_000, 0, 0, "You keep getting older...");

    const response: string = "Gregory is " + age.toString() + " years old, happy birthday!";
    generate_event(response);
    print(response);
}
