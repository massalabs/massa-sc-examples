import { call, print } from "massa-sc-std";
import { JSON } from "json-as";
import { TransferFromArgs } from "./token";

@json
export class SwapArgs {
    addrA: string = "";
    tokenA: string = "";
    amountA: u32 = 0;
    addrB: string = "";
    tokenB: string = "";
    amountB: u32 = 0;
}

export function swap(_args: string): string {
    print("In swapper");
    const args = JSON.parse<SwapArgs>(_args);
    call(args.tokenA, "transferFrom", JSON.stringify<TransferFromArgs>({owner: args.addrA, to: args.addrB, amount: args.amountA}), 0);
    call(args.tokenB, "transferFrom", JSON.stringify<TransferFromArgs>({owner: args.addrB, to: args.addrA, amount: args.amountB}), 0);
    return "worked";
}
