import { Deployer, checkWasmFile } from "./deployer";

let wasmFile = process.argv[2];
if (!wasmFile) {
    wasmFile = "build/deployer.wasm";
}

checkWasmFile(wasmFile);
console.log(`Deploying smartcontract: ${wasmFile}\n`);
const deployer = new Deployer();
await deployer.init();
await deployer.deployContract(wasmFile);
