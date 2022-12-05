import "dotenv/config";
import { Client, EOperationStatus, IAccount, IClientConfig, ProviderType, WalletClient } from "@massalabs/massa-web3";
import fs from "fs";

const DEFAULT_PUBLIC_RPC = "https://test.massa.net/api/v2:33035";
const DEFAULT_PRIVATE_RPC = "https://test.massa.net/api/v2:33034";

export class Deployer {
    deployerAccount = {} as IAccount;
    web3Client = {} as Client;

    async init() {
        if (!process.env.WALLET_PRIVATE_KEY) {
            throw new Error("WALLET_PRIVATE_KEY is not set. Did you create environment file \".env\" ?");
        }

        this.deployerAccount = await WalletClient.getAccountFromSecretKey(process.env.WALLET_PRIVATE_KEY);

        const publicRpc = process.env.JSON_RPC_URL_PUBLIC || DEFAULT_PUBLIC_RPC;
        const privateRpc = process.env.JSON_RPC_URL_PRIVATE || DEFAULT_PRIVATE_RPC;

        const providers = [
            {
                url: publicRpc,
                type: ProviderType.PUBLIC,
            },
            {
                url: privateRpc,
                type: ProviderType.PRIVATE,
            },
        ];
        const web3ClientConfig: IClientConfig = {
            providers,
            retryStrategyOn: true,
            periodOffset: 1,
        };
        this.web3Client = new Client(web3ClientConfig, this.deployerAccount);
    }

    async deployContract(contractWasm: string) {
        const binaryArrayBuffer: Buffer = fs.readFileSync(contractWasm, {});
        const binaryFileContents = new Uint8Array(binaryArrayBuffer);
        const base64: string = Buffer.from(binaryFileContents).toString("base64");
        // Deploy SC & retrieve operation ID
        const operationId = await this.web3Client.smartContracts().deploySmartContract(
            {
                fee: 0,
                maxGas: 1_000_000_000,
                contractDataBase64: base64,
            },
            this.deployerAccount,
        );

        console.log(`Operation submitted successfully to the network. Operation id: ${operationId[0]}\n`);
        console.log("Waiting for the state of operation to be Final... this may take few seconds\n");

        // Wait the end of deployment
        await this.web3Client.smartContracts().awaitRequiredOperationStatus(operationId[0], EOperationStatus.FINAL);

        const event = await this.web3Client.smartContracts().getFilteredScOutputEvents({
            emitter_address: null,
            start: null,
            end: null,
            original_caller_address: null,
            original_operation_id: operationId[0],
            is_final: null,
        });

        if (event[0]) {
            // This prints the deployed SC address
            console.log(`Deployment success with event: ${event[0].data}`);
        } else {
            console.log("Deployment success. No events has been generated");
        }
    }
}

const isWasmFile = (contractWasm: string) => {
    if (contractWasm.substring(contractWasm.length - 5) !== ".wasm") {
        throw new Error(`${contractWasm} is not a .wasm file`);
    }
};

const fileExists = (contractWasm: string) => {
    if (!fs.existsSync(contractWasm)) {
        throw new Error(`Wasm contract file "${contractWasm}" does not exist. Did you forget to compile ?`);
    }
};

export const checkWasmFile = (contractWasm: string) => {
    isWasmFile(contractWasm);
    fileExists(contractWasm);
};
