/** ***********************
 * Coin pool bidding smart contract
 **/

import { print, generate_event, get_balance, Storage, transfer_coins, send_message, get_current_period, get_current_thread, Context } from "massa-sc-std"
import { JSON, parseNumber } from "json-as";

export function raise(data: string): void {
    // get current slot
    const period = get_current_period();
    const thread = get_current_thread();

    // retrieve the context information
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    const sc_address = addresses[addresses.length - 1];
    const sender_address = addresses[addresses.length - 2];
    const coins = Context.get_call_coins();

    // get coin pool and check amount
    let coin_pool: u64 = get_balance();

    // check if prize pool reached the end
    const end_period = parseNumber<u64>(Storage.get_data("last_slot_period")) + 2;
    const end_thread = parseNumber<u64>(Storage.get_data("last_slot_thread"));
    if (period > end_period || (period == end_period && thread > end_thread)) {
        const winner = Storage.get_data("last_sender");
        transfer_coins(winner, coin_pool);
        if (coins > 0) {
            throw "coin pool bidding has ended";
        }
    }

    // check contribution amount
    if (coins < (coin_pool / 10)) {
        throw "coins amount was not high enough to make a contribution";
    }

    // update data
    Storage.set_data("last_sender", sender_address);
    Storage.set_data("last_slot_period", period.toString());
    Storage.set_data("last_slot_thread", thread.toString());

    // inform the coins have been taken
    let message: string = "coins successfully added to the coin pool";
    generate_event(message);
    print(message);

    // send check_state
    send_message(sc_address, "contribute_to_coin_pool", period, thread, period + 2, thread, 100_000, 1, 0, "check_state");
}
