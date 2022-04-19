import { Storage, Context, include_base64, call, print, create_sc } from "massa-sc-std";
import { JSON } from "json-as";
import { SetOwnerArgs, SetResolverArgs, SetApprovalForAllArgs, IsApprovedForAllArgs } from "./smart-contract";

const acct1 = "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
const acct2 = "YzydYazD1taJFcBQDquuHvv4bdiaaEStK1wCqnLtQkXC9HxkM"

function createDns(): string {
    const bytes = include_base64('./build/smart-contract.wasm');
    const dns = create_sc(bytes);
    const addresses = Context.get_call_stack();
    const my_address = addresses[0];
    Storage.set_data_for(dns, "OWNER", my_address);
    print("Created DNS at " + dns + " with owner " + my_address);
    return dns;
}

export function main(_args: string): i32 {
    const sc_address = createDns();
    call(sc_address, "setOwner", JSON.stringify<SetOwnerArgs>({name: "massa", owner: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"}), 0);
    call(sc_address, "setResolver", JSON.stringify<SetResolverArgs>({name: "massa", address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"}), 0);
    print(call(sc_address, "resolver", "massa", 0));

    const my_address = Context.get_call_stack()[0];
    // Set approval for acct1
    call(sc_address, "setApprovalForAll", JSON.stringify<SetApprovalForAllArgs>({operator: acct1, approved: 1}), 0);
    print('Approval for acct1: ' + call(sc_address, "isApprovedForAll", JSON.stringify<IsApprovedForAllArgs>({owner: my_address, operator: acct1}), 0));
    print('Approval for acct2: ' + call(sc_address, "isApprovedForAll", JSON.stringify<IsApprovedForAllArgs>({owner: my_address, operator: acct2}), 0));
    // Remove approval
    call(sc_address, "setApprovalForAll", JSON.stringify<SetApprovalForAllArgs>({operator: acct1, approved: 0}), 0);
    print('Approval for acct1: ' + call(sc_address, "isApprovedForAll", JSON.stringify<IsApprovedForAllArgs>({owner: my_address, operator: acct1}), 0));
    return 0;
}
