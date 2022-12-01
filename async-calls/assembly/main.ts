/** ***********************
 * Smart contract that pushes another SC containing a message handler
 * function and sends an asynchronous message to that same SC
 **/

import { sendMessage, createSC, currentPeriod, generateEvent, fileToByteArray, toBytes } from "@massalabs/massa-as-sdk"

export function main(): void {
    // Deploy our smart contract
    const bytes: StaticArray<u8> = fileToByteArray('./build/smart-contract.wasm');
    const address = createSC(bytes);

    // Generate an event to give the address of our deployed SC
    generateEvent(`SC created at: ${address.toByteString()}`);

    // Setup the 'message' we will send to our deployed SC
    let functionName = "receive"
    let current_period = currentPeriod();
    let validityStartPeriod = current_period + 1;
    let validityStartThread = 1 as u8;
    let validityEndPeriod = current_period + 20;
    let validityEndThread = 1 as u8;
    let maxGas = 50_000; // gas for smart contract execution
    let rawFee = 0;
    let coins = 100; // coins that can be used inside SC
    let msg = toBytes("hello my good friend!");

    // Send the message
    sendMessage(address, functionName,
        validityStartPeriod, validityStartThread, validityEndPeriod, validityEndThread,
        maxGas, rawFee, coins, msg);

    // Generate a validation event
    generateEvent(`Deployment was successful`);
}
