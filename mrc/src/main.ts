import { Storage, Context, include_base64, call, print, create_sc } from "massa-sc-std";
import { JSON } from "json-as";
import { MintArgs, TransferArgs, AllowArgs, AllowanceArgs } from "./token";

const acct1 = "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
const acct2 = "YzydYazD1taJFcBQDquuHvv4bdiaaEStK1wCqnLtQkXC9HxkM"

function createToken(name: string, supply: u32, mintRecipient: string): string {
    const bytes = include_base64('./build/token.wasm');
    const token = create_sc(bytes);
    Storage.set_data_for(token, "TOTAL_SUPPLY", supply.toString());
    Storage.set_data_for(token, "NAME", name);
    Storage.set_data_for(token, "SYMBOL", name);
    Storage.set_data_for(token, "DECIMALS", "0");
    call(token, "mint", JSON.stringify<MintArgs>({address: mintRecipient, amount: 100000}), 0)
    print("Created token " + name + " at " + token + " with initial supply " + supply.toString() + " minted to " + mintRecipient);
    return token;
}

export function main(_args: string): i32 {
    const addresses = Context.get_call_stack();
    const my_address = addresses[0];
    const token1 = createToken("seacoin", 10000, my_address);
    let bal = call(token1, "balanceOf", my_address, 0);
    print(my_address + " token balance: " + bal);
    call(token1, "transfer", JSON.stringify<TransferArgs>({to: acct2, amount: 50}), 0)
    bal = call(token1, "balanceOf", my_address, 0);
    print(my_address + " token balance: " + bal);
    bal = call(token1, "balanceOf", acct2, 0);
    print(acct2 + " token balance: " + bal);
    print("Setting allowances");
    let allowance = call(token1, "allowance", JSON.stringify<AllowanceArgs>({owner: acct1, spender: acct2}), 0);
    print("Initial allowance Owner: " + acct1 + " Spender: " + acct2 + " Amount: " + allowance);
    call(token1, "allow", JSON.stringify<AllowArgs>({amount: 25, spender: acct2}), 0);
    allowance = call(token1, "allowance", JSON.stringify<AllowanceArgs>({owner: acct1, spender: acct2}), 0);
    print("Updated allowance Owner: " + acct1 + " Spender: " + acct2 + " Amount: " + allowance);
    return 0;
}
