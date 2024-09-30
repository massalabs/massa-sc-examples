import { Context, Storage } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes, u64ToBytes } from '@massalabs/as-types';
import {
  cancelCall,
  NEXT_CALL_ID_KEY,
  registerCall,
  TASK_COUNT_KEY,
} from '../internals';

// Export task function
export { processTask } from '../internals';

export function constructor(binArgs: StaticArray<u8>): void {
  assert(Context.isDeployingContract());

  const period = new Args(binArgs).nextU64().expect('Unable to decode period');

  Storage.set(TASK_COUNT_KEY, u64ToBytes(0));
  registerCall(period);
}

export function getNextCallId(_: StaticArray<u8>): StaticArray<u8> {
  assert(Storage.has(NEXT_CALL_ID_KEY), 'No deferred call planned');
  return stringToBytes(Storage.get(NEXT_CALL_ID_KEY));
}

export function stop(_: StaticArray<u8>): void {
  assert(Storage.has(NEXT_CALL_ID_KEY), 'No deferred call to stop');
  cancelCall(Storage.get(NEXT_CALL_ID_KEY));
}
