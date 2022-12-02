import { generateEvent, createSC, fileToByteArray } from "@massalabs/massa-as-sdk";

export function main(_args: string): i32 {
    const bytes: StaticArray<u8> = fileToByteArray("##Wasm_file_path##");
    const contractAddr = createSC(bytes);

    let msg: string;
    if (contractAddr.isValid()) {
        msg = "Contract deployed at address:";
    } else {
        msg = "createSC returned an invalid address:";
    }
    generateEvent(`${msg} ${contractAddr.toByteString()}`);

    return 0;
}
