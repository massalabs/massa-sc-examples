import { EventPoller, SCEvent } from '@massalabs/massa-web3';
import { scheduler } from 'timers/promises';
import { getAccountProvider, getContractAddress } from './utils';

const provider = await getAccountProvider();
const contractAddress = await getContractAddress();

let stop = false;

const onData = async (events: SCEvent[]) => {
  for (const event of events) {
    console.log(
      `Event period: ${event.context.slot.period} thread: ${event.context.slot.thread} -`,
      event.data,
    );
  }
};

const onError = (error: Error) => {
  console.error('Error:', error);
  stop = true;
};
const { stopPolling } = EventPoller.start(
  provider,
  {
    smartContractAddress: contractAddress,
  },
  onData,
  onError,
  5000,
);

while (!stop) {
  await scheduler.wait(5000);
}
stopPolling();
