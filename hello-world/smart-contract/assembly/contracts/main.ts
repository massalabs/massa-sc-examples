import {
  Storage,
  Context,
  generateEvent,
  deferredCallRegister,
  deferredCallCancel,
} from '@massalabs/massa-as-sdk';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param args - The arguments to the constructor containing the message to be logged
 */
export function constructor(_: StaticArray<u8>): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return;
  }

  registerCall([]);
}

export function getId(_: StaticArray<u8>): void {
  let callId = Storage.get('deferredCallId');
  generateEvent(callId);
}

export function registerCall(_: StaticArray<u8>): void {
  let callId = deferredCallRegister(
    Context.callee().toString(),
    'getMessage',
    Context.currentPeriod() + 50,
    Context.currentThread() + 1,
    2_000_000,
    [],
    1000000,
  );

  Storage.set('deferredCallId', callId);
  generateEvent('Deferred call registered');
  generateEvent('Deferred call id: ' + callId.toString());
}

export function cancelCall(_: StaticArray<u8>): void {
  let callId = Storage.get('deferredCallId');
  deferredCallCancel(callId);
  generateEvent('Deferred call canceled');
}
