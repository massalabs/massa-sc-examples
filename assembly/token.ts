import { Storage, get_call_stack, print } from "massa-sc-std";
import { JSON } from "json-as";

@json
export class MintArgs {
    address: string = "";
    amount: u32 = 0;
}

@json
export class TransferArgs {
    to: string = "";
    amount: u32 = 0;
}

function balKey(address: string): string {
    return "bal" + address;
}

export function name(): string {
    // must be set or will revert
    return Storage.get_data("NAME")
}

export function symbol(): string {
    return Storage.get_data("SYMBOL");
}

export function decimals(): string {
    return Storage.get_data("DECIMALS")
}

export function totalSupply(): string {
    return Storage.get_data("TOTAL_SUPPLY")
}

export function balanceOf(address: string): string {
    const key = balKey(address);
    if (Storage.has_data(key)) {
        const raw_bal = Storage.get_data("bal" + address);
        return raw_bal;
    } else return "0";
}

export function transfer(_args: string): string {
    const args = JSON.parse<TransferArgs>(_args);
    const addresses = JSON.parse<string[]>(get_call_stack());
    const my_address = addresses[0];

    print("transfering " + args.amount.toString() + " tokens from " + my_address + " to " + args.to);
    let senderBal = U32.parseInt(balanceOf(my_address));
    let receiverBal = U32.parseInt(balanceOf(args.to));
    assert(senderBal > args.amount, "INSUFFICIENT_BALANCE")
    senderBal -= args.amount;
    Storage.set_data(balKey(my_address), senderBal.toString());
    receiverBal += args.amount;
    Storage.set_data(balKey(args.to), receiverBal.toString());
    return args.amount.toString();
}

export function mint(_args: string): string {
    const args = JSON.parse<MintArgs>(_args);
    print("minting " + args.amount.toString() + " tokens for " + args.address);
    let supply = U32.parseInt(totalSupply());
    print("Current supply: " + supply.toString())
    supply += args.amount;
    print("New supply: " + supply.toString())
    Storage.set_data("TOTAL_SUPPLY", supply.toString());
    let bal = U32.parseInt(balanceOf(args.address));
    bal += args.amount;
    Storage.set_data(balKey(args.address), bal.toString())
    return args.amount.toString();
}
