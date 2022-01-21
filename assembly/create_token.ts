import { Storage, include_base64, get_call_stack, call, print, create_sc } from "massa-sc-std";
import { JSON } from "json-as";
import { MintArgs, TransferArgs } from "./token";

const acct1 = "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
const acct2 = "YzydYazD1taJFcBQDquuHvv4bdiaaEStK1wCqnLtQkXC9HxkM"

export function main(_args: string): i32 {
    const bytes = include_base64('./build/token.wasm');
    const token = create_sc(bytes);
    const addresses = JSON.parse<string[]>(get_call_stack());
    const my_address = addresses[0];
    Storage.set_data_for(token, "TOTAL_SUPPLY", "0");
    Storage.set_data_for(token, "NAME", "z80coin");
    let bal = call(token, "balanceOf", my_address, 0);
    print(my_address + " token balance: " + bal);
    // call(token, "mint", JSON.stringify<MintArgs>(new MintArgs(my_address, 100)), 0)
    call(token, "mint", JSON.stringify<MintArgs>({address: my_address, amount: 100}), 0)
    bal = call(token, "balanceOf", my_address, 0);
    print(my_address + " token balance: " + bal);
    call(token, "transfer", JSON.stringify<TransferArgs>({to: acct2, amount: 500}), 0)
    bal = call(token, "balanceOf", my_address, 0);
    print(my_address + " token balance: " + bal);
    bal = call(token, "balanceOf", acct2, 0);
    print(acct2 + " token balance: " + bal);
    return 0;
}
