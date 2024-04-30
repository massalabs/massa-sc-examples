import {
  IDeploymentInfo,
  ISCData,
  deploySC,
} from "@massalabs/massa-sc-deployer";
import {
  CHAIN_ID,
  MAX_GAS_DEPLOYMENT,
  WalletClient,
  fromMAS,
  Args,
  EventPoller,
  Client,
  ClientFactory,
  ProviderType,
  IProvider,
  IEventFilter,
  MAX_GAS_CALL,
  bytesToStr,
  IEvent,
  EOperationStatus,
} from "@massalabs/massa-web3";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Helper function to get environment variable from env
function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key} in .env file`);
  }
  return value;
}

// Helper function to read bytecode from file
function getByteCode(folderName: string, fileName: string): Buffer {
  // Obtain the current file name and directory paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return readFileSync(path.join(__dirname, folderName, fileName));
}

// Helper function to get the address from the deployment result
async function getEventsFromOp(opId: string): Promise<IEvent[]> {
  // Wait for the operation to be speculative success or Speculative failure
  // First promise that resolves stops the execution
  await web3Client
    .smartContracts()
    .awaitMultipleRequiredOperationStatus(opId, [
      EOperationStatus.SPECULATIVE_SUCCESS,
      EOperationStatus.SPECULATIVE_ERROR,
    ]);

  // Filter to get the deployment event
  const eventsFilter = {
    start: null,
    end: null,
    original_caller_address: null,
    original_operation_id: opId,
    emitter_address: null,
    is_final: false,
  } as IEventFilter;

  // Get the deployment event
  const deploymentEvents = await EventPoller.getEventsOnce(
    eventsFilter,
    web3Client
  );
  return deploymentEvents;
}

// Get environment variables
const publicApi = getEnvVariable("JSON_RPC_URL_PUBLIC");
const secretKey = getEnvVariable("WALLET_SECRET_KEY");

// Define deployment parameters
const chainId = CHAIN_ID.BuildNet; // Choose the chain ID corresponding to the network you want to deploy to
const maxGas = 2980167295n; // Gas for deployment Default is the maximum gas allowed for deployment
const fees = fromMAS(0.01); // Fees to be paid for deployment. Default is 0

// Create an account using the secret key
const deployerAccount = await WalletClient.getAccountFromSecretKey(secretKey);

// Create a random account for the user
const userAccount = await WalletClient.walletGenerateNewAccount();

// Create a web3 client
const web3Client: Client = await ClientFactory.createCustomClient(
  [
    { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
    // Using a placeholder IP since the script doesn't require a real one, though massa-web3 does.
    { url: publicApi, type: ProviderType.PRIVATE } as IProvider,
  ],
  chainId,
  true,
  deployerAccount
);

// Send some coins to the user account
web3Client.wallet().sendTransaction({
  fee: fromMAS(0.01),
  amount: fromMAS(1),
  recipientAddress: userAccount.address!,
});

// Deploy the smart contract
const deploymentResult = await deploySC(
  publicApi, // JSON RPC URL
  deployerAccount, // account deploying the smart contract(s)
  [
    {
      data: getByteCode("build", "main.wasm"), // smart contract bytecode
      coins: fromMAS(0.1), // coins for deployment
      args: new Args()
        .addString(deployerAccount.address!)
        .addString(userAccount.address!), // arguments for deployment
    } as ISCData,
    // Additional smart contracts can be added here for deployment
  ],
  chainId, // chain ID
  fees, // fees for deployment
  maxGas, // maximum gas for deployment
  false // wait for the deployment finality
);

// Get the address of the deployed smart contract
const deploymentEvents = await getEventsFromOp(deploymentResult.opId);
// Get the smart contract address from the deployment event
if (deploymentEvents.length === 0) {
  throw new Error("No events found for the deployment");
}
const scAddress = deploymentEvents[0].data.split(": ")[1];
console.log(`Smart contract deployed at address: ${scAddress}`);

// Get the adminAddress
const adminAddress = bytesToStr(
  (
    await web3Client.smartContracts().readSmartContract({
      targetAddress: scAddress,
      targetFunction: "getAdmin",
      parameter: new Args(),
      maxGas: MAX_GAS_CALL,
      callerAddress: deployerAccount.address!,
    })
  ).returnValue
);

// Check if the admin address is the expected one
if (adminAddress !== deployerAccount.address) {
  throw new Error("Admin address is not the expected one");
}

// Use the user account to interact with the smart contract
const web3ClientUser: Client = await ClientFactory.createCustomClient(
  [
    { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
    // Using a placeholder IP since the script doesn't require a real one, though massa-web3 does.
    { url: publicApi, type: ProviderType.PRIVATE } as IProvider,
  ],
  chainId,
  true,
  userAccount
);

console.log(
  "Trying to change the admin address with the user account (not allowed)..."
);

// Try to change the admin address with the user account that is not the admin (should fail)
const opId = await web3ClientUser.smartContracts().callSmartContract({
  targetAddress: scAddress,
  functionName: "changeAdmin",
  parameter: new Args().addString(userAccount.address!),
  maxGas: MAX_GAS_CALL,
  fee: fromMAS(0.01),
});

const callEvents = await getEventsFromOp(opId);
if (callEvents.length === 0) {
  throw new Error("No events found for the call");
}
if (
  !callEvents[0].data.includes(
    "VM execution error: RuntimeError: Runtime error: error: User does not have 'admin' permission."
  )
) {
  throw new Error("The call should have failed");
} else {
  console.log("The call to change admin from user failed as expected");
}

// Get the adminAddress
const adminAddress2 = bytesToStr(
  (
    await web3Client.smartContracts().readSmartContract({
      targetAddress: scAddress,
      targetFunction: "getAdmin",
      parameter: new Args(),
      maxGas: MAX_GAS_CALL,
      callerAddress: deployerAccount.address!,
    })
  ).returnValue
);

// Check if the admin address is the expected one
if (adminAddress2 !== deployerAccount.address) {
  throw new Error("Admin address is not the expected one");
}

console.log(
  "Trying to change the admin address with the deployer account (allowed)..."
);

// Change the admin address with the deployer account
const opId2 = await web3Client.smartContracts().callSmartContract({
  targetAddress: scAddress,
  functionName: "changeAdmin",
  parameter: new Args().addString(userAccount.address!),
  maxGas: MAX_GAS_CALL,
  fee: fromMAS(0.01),
});

// Get the event for the call
const callEvents2 = await getEventsFromOp(opId2);
if (callEvents2.length !== 0) {
  throw new Error("No events is expected for the call");
}

console.log("Admin address changed successfully");

// Get the adminAddress
const adminAddress3 = bytesToStr(
  (
    await web3Client.smartContracts().readSmartContract({
      targetAddress: scAddress,
      targetFunction: "getAdmin",
      parameter: new Args(),
      maxGas: MAX_GAS_CALL,
      callerAddress: deployerAccount.address!,
    })
  ).returnValue
);

// Check if the admin address is the expected one
if (adminAddress3 !== userAccount.address) {
  throw new Error("Admin address is not the expected one");
}

process.exit(0);