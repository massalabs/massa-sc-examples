import { Storage, generate_event, call } from "massa-sc-std";
import { JSON } from "json-as";
import { PlayArgs } from "./smart-contract";

export function main(_args: string): i32 {
    // Replace by your smart-contract address
    const sc_address = "YOUR_SMART_CONTRACT_ADDRESS";
    // Start a new game
    call(sc_address, "initialize", "", 0);
    // Let's play a whole game in one smart-contract!
    call(sc_address, "play", JSON.stringify<PlayArgs>({ index: 0 }), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({ index: 3 }), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({ index: 1 }), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({ index: 4 }), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({ index: 2 }), 0)
    generate_event("Current player:" + Storage.get_data_for(sc_address, "currentPlayer"))
    generate_event("Game state:" + Storage.get_data_for(sc_address, "gameState"))
    generate_event("Game winner:" + Storage.get_data_for(sc_address, "gameWinner"))
    return 0;
}