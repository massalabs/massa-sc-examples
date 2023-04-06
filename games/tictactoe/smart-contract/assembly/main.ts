import { generateEvent, fileToByteArray, createSC, call, Address, transferCoins, Args } from "@massalabs/massa-as-sdk";

function createContract(): Address {
    const bytes: StaticArray<u8> = fileToByteArray('./build/smart-contract.wasm');
    const sc_address = createSC(bytes);
    transferCoins(sc_address, 100_000_000_000);
    return sc_address;
}

export function main(_args: StaticArray<u8>): void {
    const sc_address = createContract();
    call(sc_address, "initialize", new Args(), 0);
    generateEvent("Created tictactoe smart-contract at:" + sc_address.toByteString());
    return;
}