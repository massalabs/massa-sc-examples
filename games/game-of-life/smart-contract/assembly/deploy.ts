import { include_base64, call, generate_event, Storage, Context, print } from "massa-sc-std";

/*@json
export class SetResolverArgs {
    name: string = "";
    address: string = "";
}*/

export function main(_args: string): i32 {
    // deploy SC
    const bytes = include_base64('./build/sc.wasm');
    Storage.set_bytecode(bytes);
    let addr = Context.get_call_stack()[0];
    call(addr, "advance", "", 0);
    generate_event("gol SC deployed at addr: " + addr);
    print("gol SC deployed at addr: " + addr);
    const website = include_base64('./build/site.zip');
    Storage.set_data_for(addr, "massa_web", website);
    generate_event("gol SC deployed website at addr: " + addr);
    print("gol website deployed at addr: " + addr);
    
    /*const resolver_address = "2AQGtYuuHHkQwgVriY6fnwGfnLFUDyDws2D1Ja5N79yNiby3pR"
    call(resolver_address, "setResolver", JSON.stringify<SetResolverArgs>({name: "gameoflife", address: addr}), 0);
    generate_event("gol SC deployed MNS");*/

    return 0;
}