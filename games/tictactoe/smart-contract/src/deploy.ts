import { generate_event, include_base64, create_sc } from "massa-sc-std";

function createContract(): string {
    const bytes = include_base64('./build/smart-contract.wasm');
    const sc_address = create_sc(bytes);
    return sc_address;
}

export function main(_args: string): i32 {
    const sc_address = createContract();
    generate_event("Created tictactoe smart-contract at:" + sc_address);
    return 0;
}