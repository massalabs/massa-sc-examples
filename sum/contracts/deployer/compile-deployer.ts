import fs from "fs";
import asc from "assemblyscript/dist/asc";
import { checkWasmFile } from "./deployer";

const injectSC = (scFilePath: string): string => {
    const deployer = fs.readFileSync("./deployer/deployer.as.ts", "utf-8");
    return deployer.replace("##Wasm_file_path##", scFilePath);
};

const compileDeployer = async (deployer: string) => {
    await asc.main(["-o", "build/deployer.wasm", "deployer.ts"], {
        readFile: (name, _) => {
            if (name === "deployer.ts") {
                return deployer;
            }
            if (fs.existsSync(name)) {
                return fs.readFileSync(name).toString();
            }
            return null;
        },
    });
};

const buildDeployer = async (scFilePath: string) => {
    // Inject SC in deployer contract
    const deployerStr = injectSC(scFilePath);
    // Build deployer contract
    await compileDeployer(deployerStr);
};

let contractWasm = process.argv[2];
if (!contractWasm) {
    contractWasm = "build/main.wasm";
}

checkWasmFile(contractWasm);
console.log(`Compile deployer for smartcontract: ${contractWasm}\n`);
await buildDeployer(contractWasm);
