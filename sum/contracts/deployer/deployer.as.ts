import { generateEvent, createSC, fileToBase64 } from "@massalabs/massa-as-sdk";

export function main(_args: string): i32 {
    const b64wasm = fileToBase64("##Wasm_file_path##");
    const contractAddr = createSC(b64wasm);

    let msg: string;
    if (contractAddr.isValid()) {
        msg = "Contract deployed at address:";
    } else {
        msg = "createSC returned an invalid address:";
    }
    generateEvent(`${msg} ${contractAddr.toByteString()}`);

    return 0;
}
