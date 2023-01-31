import { Args, stringToBytes } from "@massalabs/as-types";
/** ***********************
 *
 * SendHelloAsyncMessage sends an asynchronous message to a previous deployed contract containing a message handler function
 **/

import {
    sendMessage,
    currentPeriod,
    callerHasWriteAccess,
    Address,
} from "@massalabs/massa-as-sdk";

/**

 * This function is meant to be called only one time: when the contract is deployed.

 */
export function constructor(binaryArgs: StaticArray<u8>): StaticArray<u8> {
    // This line is important. It ensure that this function can't be called in the future.
    // If you remove this check someone could call your constructor function and reset your SC.
    if (!callerHasWriteAccess()) {
        return [];
    }
    sendHelloMessage(binaryArgs);
    return [];
}

/**

 * @param binaryArgs - The address of the receive message contract encoded with `Args`

 * @returns empty array

 */
export function sendHelloAsyncMessage(
    binaryArgs: StaticArray<u8>
): StaticArray<u8> {
    // Setup the 'message' we will send to our deployed SC
    const functionName = "receive";
    const current_period = currentPeriod();
    const validityStartPeriod = current_period + 1;
    const validityStartThread = 13 as u8;
    const validityEndPeriod = current_period + 20;
    const validityEndThread = 13 as u8;
    const maxGas = 1_000_000_000; // gas for smart contract execution.
    const rawFee = 0;
    const coins = 100; // coins that can be used inside SC.
    const msg = new Args().add("hello my good friend!").serialize();

    const args = new Args(binaryArgs);

    const address = new Address(
        args.nextString().expect("Address argument is missing or invalid")
    );

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

    return [];
}
