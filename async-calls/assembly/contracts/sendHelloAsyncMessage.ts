import { Args, stringToBytes } from "@massalabs/as-types";
/** ***********************
 *
 * SendHelloAsyncMessage sends an asynchronous message to a previous deployed contract containing a message handler function
 **/

import {
    sendMessage,
    Context,
    callerHasWriteAccess,
    Address,
} from "@massalabs/massa-as-sdk";

/**

 * This function is meant to be called only one time: when the contract is deployed.

 */
@massaExport()
export function constructor(addr: string): void {
    // This line is important. It ensure that this function can't be called in the future.
    // If you remove this check someone could call your constructor function and reset your SC.
    if (!callerHasWriteAccess()) {
        return;
    }
    sendHelloAsyncMessage(addr);
}

/**

 * @param binaryArgs - The address of the receive message contract encoded with `Args`

 * @returns empty array

 */
@massaExport()
export function sendHelloAsyncMessage(addr: string): void {
    // Setup the 'message' we will send to our deployed SC
    const functionName = "receive";
    const current_period = Context.currentPeriod();
    const validityStartPeriod = current_period + 1;
    const validityStartThread = 13 as u8;
    const validityEndPeriod = current_period + 20;
    const validityEndThread = 13 as u8;
    const maxGas = 1_000_000_000; // gas for smart contract execution.
    const rawFee = 0;
    const coins = 100; // coins that can be used inside SC.
    const msg = new Args().add("hello my good friend!").serialize();

    const address = new Address(addr);

    // Send the message
    sendMessage(
        address,
        functionName,
        validityStartPeriod,
        validityStartThread,
        validityEndPeriod,
        validityEndThread,
        maxGas,
        rawFee,
        coins,
        msg
    );
}
