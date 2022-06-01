/** ***********************
 * Smart contract that pushes a SC containing the message handler
 * function and sends an asynchronous message to that same SC
 **/

import { include_base64, create_sc, send_message, print, generate_event, get_current_period } from "massa-sc-std"

export function main(name: string): void {
    const bytes = include_base64('./build/smart-contract.wasm');
    const address = create_sc(bytes);
    const info = "receiver address: " + address;
    const current = get_current_period();
    const next = current + 3;
    send_message(address, "receive_and_send", current, 0, next, 0, 100_000, 0, 0, "first message");
    generate_event(info);
    print(info)
}
