import { generateEvent, fileToBase64, createSC, call, Address } from "@massalabs/massa-sc-std";

function createContract(): Address {
    const bytes = fileToBase64('./build/smart-contract.wasm');
    const sc_address = createSC(bytes);
    return sc_address;
}

export function main(_args: string): i32 {
    const sc_address = createContract();
    call(sc_address, "initialize", "", 0);
    generateEvent("Created tictactoe smart-contract at:" + sc_address.toByteString());
    return 0;
}