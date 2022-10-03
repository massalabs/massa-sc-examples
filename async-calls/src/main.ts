/** ***********************
 * Smart contract that pushes a SC containing the message handler
 * function and sends an asynchronous message to that same SC
 **/

import { include_base64, create_sc, send_message, generate_event, get_current_period } from "massa-sc-std"

export function main(name: string): void {
    const bytes = include_base64('./build/smart-contract.wasm');
    const address = create_sc(bytes);
    const message = "Gregory was born today! He lives at " + address;

    const start_p = get_current_period();
    const end_p = start_p + 5;
    send_message(address, "receive_and_send", start_p, 0, end_p, 31, 100_000, 0, 1_000_000_000, message);
    generate_event(message);
}
