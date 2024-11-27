import {
  Account,
  AccountOperation,
  Args,
  JsonRPCClient,
  OperationStatus,
  SmartContract,
  bytesToStr,
} from "@massalabs/massa-web3";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// // Helper function to read bytecode from file
function getByteCode(folderName: string, fileName: string): Buffer {
  // Obtain the current file name and directory paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return readFileSync(path.join(__dirname, folderName, fileName));
}

// // Helper function to get the address from the deployment result
// async function getEventsFromOp(opId: string): Promise<IEvent[]> {
//   // Wait for the operation to be speculative success or Speculative failure
//   // First promise that resolves stops the execution
//   await web3Client
//     .smartContracts()
//     .awaitMultipleRequiredOperationStatus(opId, [
//       EOperationStatus.SPECULATIVE_SUCCESS,
//       EOperationStatus.SPECULATIVE_ERROR,
//     ]);

//   // Filter to get the deployment event
//   const eventsFilter = {
//     start: null,
//     end: null,
//     original_caller_address: null,
//     original_operation_id: opId,
//     emitter_address: null,
//     is_final: false,
//   } as IEventFilter;

//   // Get the deployment event
//   const deploymentEvents = await EventPoller.getEventsOnce(
//     eventsFilter,
//     web3Client
//   );
//   return deploymentEvents;
// }

// Get environment variables
const decimals = 10 ** 9;
const apiUrl = "https://buildnet.massa.net/api/v2";

const adminAccount = await Account.fromEnv();
const adminAddress = adminAccount.address.toString();
const userAccount = await Account.generate();
const client = new JsonRPCClient(apiUrl);
const adminAccountOperation = await new AccountOperation(adminAccount, client);

adminAccountOperation.transfer(userAccount.address, BigInt(10 * decimals));

const contract = await SmartContract.deploy(
  client,
  adminAccount,
  {
    byteCode: getByteCode("build", "main.wasm"),
    coins: BigInt(10 * decimals),
    parameter: new Args()
      .addString(adminAddress)
      .addString(userAccount.address.toString())
      .serialize(),
  },
  {
    waitFinalExecution: false,
  }
);

const adminAddressSC = bytesToStr(
  (await contract.read("getAdmin", new Args().serialize())).value
);
if (adminAddressSC !== adminAddress) {
  throw new Error("Admin address is not the expected one");
}
console.log("Admin address is the expected one");

console.log(
  "Trying to change the admin address with the user account (not allowed)..."
);
try {
  await contract.call(
    "changeAdmin",
    new Args().addString(userAccount.address.toString()).serialize(),
    {
      account: userAccount,
    }
  );
} catch {
  console.log("Admin address change failed as expected");
}

console.log(
  "Trying to change the admin address with the deployer account (allowed)..."
);
const op = await contract.call(
  "changeAdmin",
  new Args().addString(userAccount.address.toString()).serialize(),
  {
    account: adminAccount,
  }
);
await op.waitSpeculativeExecution();
console.log("Admin address changed successfully");

const adminAddressSC2 = bytesToStr(
  (await contract.read("getAdmin", new Args().serialize())).value
);
if (adminAddressSC2 !== userAccount.address.toString()) {
  throw new Error("Admin address is not the expected one");
}

process.exit(0);
