/** ***********************
 * Create coin pool bidding smart contract
 **/

import { print, generate_event, include_base64, create_sc } from "massa-sc-std"

export function main(name: string): void {
    // create coin_pool_bidding
    const bytes = include_base64('./build/coin_pool_bidding.wasm');
    const address = create_sc(bytes);

    // inform nodes of the creation
    const message = "coin pool bidding is available at " + address;
    generate_event(message);
    print(message);
}
