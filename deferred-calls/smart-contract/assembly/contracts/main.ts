import {
  Storage,
  Context,
  generateEvent,
  deferredCallRegister,
  deferredCallCancel,
  deferredCallExists,
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
  generateEvent(callId.toString());
}

export function registerCall(_: StaticArray<u8>): void {
  let callId = deferredCallRegister(
    Context.callee().toString(),
    'registerCall',
    Context.currentPeriod() + 3,
    Context.currentThread(),
    2_000_000,
    [],
    1000000,
  );

  Storage.set('deferredCallId', callId);
  generateEvent('Deferred registered - call id: ' + callId.toString());
}


export function registerCall2(_: StaticArray<u8>): void {
  let callId = deferredCallRegister(
    Context.callee().toString(),
    'registerCall2',
    Context.currentPeriod() + 3,
    Context.currentThread(),
    2_000_000,
    [],
    1000000,
  );

  Storage.set('deferredCallId2', callId);
  generateEvent('Deferred registered - call id: ' + callId.toString());
}

export function exists(_: StaticArray<u8>): void {
  let callId = Storage.get('deferredCallId');
  let exists = deferredCallExists(callId.toString());
  generateEvent('Deferred call exists: ' + exists.toString());
}


export function cancelCall(_: StaticArray<u8>): void {
  let callId = Storage.get('deferredCallId');
  deferredCallCancel(callId.toString());
  generateEvent('Deferred call canceled id : ' + callId.toString());
}

export function cancelCall2(_: StaticArray<u8>): void {
  let callId = Storage.get('deferredCallId2');
  deferredCallCancel(callId.toString());
  generateEvent('Deferred call canceled id : ' + callId.toString());
}
