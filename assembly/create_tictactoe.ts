import { Storage, Context, include_base64, call, print, create_sc } from "massa-sc-std";
import { JSON } from "json-as";
import { PlayArgs } from "./tic_tac_toe";

function createContract(): string {
    const bytes = include_base64('./build/tictactoe_play.wasm');
    const sc_address = create_sc(bytes);
    return sc_address;
}

export function main(_args: string): i32 {
    const sc_address = createContract();
    call(sc_address, "initialize", "", 0);
    print("Initialized, address:" + sc_address);
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 0}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 3}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 1}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 4}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 2}), 0)
    print("Current player:" + Storage.get_data_for(sc_address, "currentPlayer"))
    print("Game state:" + Storage.get_data_for(sc_address, "gameState"))
    print("Game winner:" + Storage.get_data_for(sc_address, "gameWinner"))
    return 0;
}
