/** ***********************
 * Smart contract that pushes a SC containing a message handler
 * function and sends an asynchronous message to that same SC
 **/

import { sendMessage, print, createSC, fileToBase64, currentPeriod, generateEvent } from "@massalabs/massa-as-sdk"

export function main(name: string): void {
    // Deploy our smart contract
    const bytes = fileToBase64('./build/smart-contract.wasm');
    const address = createSC(bytes);

    // Send a 'message' to our newly deployed smart contract
    let functionName = "receive"
    let current_period = currentPeriod();
    let validityStartPeriod = current_period + 2;
    let validityStartThread = 1 as u8;
    let validityEndPeriod = current_period + 20;
    let validityEndThread = 1 as u8;
    let maxGas = 50_000; // gas for smart contract execution
    let gasPrice = 0; // Message priority = gasPrice * maxGas
    let coins = 100; // coins that can be used inside SC
    let msg = "hello my good friend!"
    sendMessage(address, functionName,
        validityStartPeriod, validityStartThread, validityEndPeriod, validityEndThread,
        maxGas, gasPrice, coins, msg);
    // print("receiver created and message sent")

    generateEvent(`SC created at: ${address.toByteString()}`)
    // generateEvent("SC created at")
}
