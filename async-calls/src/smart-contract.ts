/** ***********************
 * Smart contract containing the message handler function
 **/

import { send_message, generate_event, get_current_period, Context, Storage } from "massa-sc-std"

export function receive_and_send(data: string): void {
    const call_stack = Context.get_call_stack();
    const current_address = call_stack[call_stack.length - 1];

    const age: number = parseInt(Storage.get_data_or_default("age", "0")) + 1;
    Storage.set_data("age", age.toString());
    generate_event("Gregory is " + age.toString() + " years old, happy birthday!");

    let kids_count: number = parseInt(Storage.get_data_or_default("kids_count", "0")) + 1;
    if (age % 2 == 0) {
        let kid: string = "kid number " + kids_count.toString();
        Storage.set_data(kid, "human");
        Storage.set_data("kids_count", kids_count.toString());
        generate_event(kid + " is born, so cute!");
    }

    const start_p = get_current_period() + 1;
    const end_p = start_p + 5;
    send_message(current_address, "receive_and_send", start_p, 0, end_p, 31, 100_000, 0, 0, "You keep getting older...");
}
