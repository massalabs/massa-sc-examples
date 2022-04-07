/** ***********************
 * Smart contract containing a message handler function
 **/

import { print, generate_event, Storage, include_base64, create_sc, send_message, get_current_period, get_current_thread } from "massa-sc-std"

export function main(name: string): void {
    const bytes = include_base64('./build/lottery.wasm');
    const address = create_sc(bytes);

    const period = get_current_period();
    const thread = get_current_thread();
    send_message(address, "contribute_to_prize_pool", period, thread, period + 10, thread, 100_000, 1, 100, "first user data");

    const message = "lottery is available at " + address;
    generate_event(message);
    print(message);
}

export function contribute_to_prize_pool(data: string): void {
    // data should contain:
    // - sender address
    // - coins

    const period = get_current_period();
    const thread = get_current_thread();

    if (data == "wake") {
        // send wake again and do nothing if wake
        send_message("", "contribute_to_prize_pool", period, thread, period + 10, thread, 100_000, 1, 100, "wake");
        return;
    }

    // add coins to the prize pool
    // missing: save the last sender + last slot + pool
    // missing: take from the sender
    let prize_pool: number = parseInt(Storage.get_data("prize_pool"));
    prize_pool += parseInt(data);
    Storage.set_data("last_sender", "addrs");
    Storage.set_data("last_slot", "42");
    Storage.set_data("prize_pool", prize_pool.toString());

    // inform the coins have been taken
    let message: string = "coins added to the prize pool";
    generate_event(message);
    print(message);

    // send wake
    send_message("", "contribute_to_prize_pool", period, thread, period + 10, thread, 100_000, 1, 100, "wake");
}
