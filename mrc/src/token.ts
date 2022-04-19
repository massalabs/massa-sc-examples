/* ERC20 Implementation for Massa Labs
 *
 * */
import { Storage, Context, print } from "massa-sc-std";
import { JSON } from "json-as";

/*
Arguments to be parsed by each public function

in cosm-wasm they call these "messages"

Questions to be answered:
- Since anything beyond a single string requires us to decode JSON, should we follow
  this pattern even for functions that accept a single string?

- In the future, what tooling can we write to abstract JSON encoding/decoding from the
  smart contract author?
 */
@json
export class MintArgs {
    address: string = "";
    amount: u32 = 0;
}

@json
export class AllowArgs {
    spender: string = "";
    amount: u32 = 0;
}

@json
export class AllowanceArgs {
    owner: string = "";
    spender: string = "";
}

@json
export class TransferArgs {
    to: string = "";
    amount: u32 = 0;
}

@json
export class TransferFromArgs {
    owner: string = "";
    to: string = "";
    amount: u32 = 0;
}

/* External functions */

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
    const key = _balKey(address);
    return Storage.get_data_or_default(key, "0");
}

export function transfer(_args: string): string {
    const args = JSON.parse<TransferArgs>(_args);
    const addresses = Context.get_call_stack();
    const sender = addresses[0];
    return _transfer(sender, args.to, args.amount).toString();
}

export function allow(_args: string): string {
    const args = JSON.parse<AllowArgs>(_args);
    const addresses = Context.get_call_stack();
    const owner = addresses[0];
    _setAllowance(owner, args.spender, args.amount);
    return args.amount.toString();
}

export function allowance(_args: string): string {
    const args = JSON.parse<AllowanceArgs>(_args);
    return _getAllowance(args.owner, args.spender);
}

export function transferFrom(_args: string): void {
    const addresses = Context.get_call_stack();
    const spender = addresses[addresses.length - 2];
    const args = JSON.parse<TransferFromArgs>(_args);
    const allowed = U32.parseInt(_getAllowance(args.owner, spender));
    assert(args.amount < allowed, "ALLOWANCE_EXCEEDED");
    _transfer(args.owner, args.to, args.amount);
    const newAllowance = allowed - args.amount;
    _setAllowance(args.owner, spender, newAllowance);
}

export function mint(_args: string): string {
    // anyone can call this!!!
    const args = JSON.parse<MintArgs>(_args);
    let supply = U32.parseInt(totalSupply());
    supply += args.amount;
    Storage.set_data("TOTAL_SUPPLY", supply.toString());
    let bal = U32.parseInt(balanceOf(args.address));
    bal += args.amount;
    _setBalance(args.address, bal);
    return args.amount.toString();
}

// internal utility functions

function _transfer(sender: string, recipient: string, amount: u32): u32 {
    let senderBal = U32.parseInt(balanceOf(sender));
    assert(senderBal > amount, "INSUFFICIENT_BALANCE")
    let receiverBal = U32.parseInt(balanceOf(recipient));
    senderBal -= amount;
    _setBalance(sender, senderBal);
    receiverBal += amount;
    _setBalance(recipient, receiverBal);
    return amount;
}

function _setAllowance(owner: string, spender: string, amount: u32): void {
    Storage.set_data(_allowKey(owner, spender), amount.toString());
}

function _getAllowance(owner: string, spender: string): string {
    if (Storage.has_data(_allowKey(owner, spender))) {
        return Storage.get_data(_allowKey(owner, spender))
    } else {
        Storage.set_data(_allowKey(owner, spender), "0");
        return "0";
    }
}

function _setBalance(address: string, balance: u32): void {
    Storage.set_data(_balKey(address), balance.toString());
}

function _balKey(address: string): string {
    return "bal" + address;
}

function _allowKey(address: string, spender: string): string {
    return "allow" + address + spender;
}
