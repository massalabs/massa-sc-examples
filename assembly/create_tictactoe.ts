import { Storage, Context, include_base64, call, print, create_sc } from "massa-sc-std";
import { JSON } from "json-as";
import { PlayArgs } from "./tic_tac_toe";

function createContract(): string {
    const bytes = include_base64('./build/tic_tac_toe.wasm');
    const sc_address = create_sc(bytes);
    return sc_address;
}

export function main(_args: string): i32 {
    const sc_address = createContract();
    call(sc_address, "initialize", "", 0);
    print("Initialized, address:" + sc_address);
    call(sc_address, "play", JSON.stringify<PlayArgs>({x: 0, y: 0}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({x: 0, y: 1}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({x: 1, y: 0}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({x: 1, y: 1}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({x: 2, y: 0}), 0)
    return 0;
}
