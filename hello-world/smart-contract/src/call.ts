/* eslint-disable no-console */
import 'dotenv/config';
import {
  Account,
  Args,
  Mas,
  Web3Provider,
  OperationStatus,
  SmartContract,
  bytesToStr,
} from '@massalabs/massa-web3';
import { getAccountProvider, getContractAddress } from './utils';

/**
 * Call the `setMessage` function of the smart contract previously deployed.
 *
 * Prerequisites :
 * - You must update the `.env` file at the root of the repository with the key:
 *   - CONTRACT_ADDRESS="contract_address"
 * where `"contract_address"` is the address of the smart contract the deployment
 * script has returned.
 *
 * After the `setMessage` function is called, the smart contract will emit an
 * event.
 * This function will wait for the event to be emitted and then display the
 * event data and the origin operation id.
 */
async function callSetMessage(message: string) {
  const contractAddress = await getContractAddress();
  const provider = await getAccountProvider();

  console.log('Calling setMessage function...');

  const helloContract = new SmartContract(provider, contractAddress);
  const operation = await helloContract.call(
    'setMessage',
    new Args().addString(message).serialize(),
    {
      coins: Mas.fromString('0.01'),
    },
  );

  console.log(
    'setMessage function called successfully, operation id:',
    operation.id,
  );

  console.log('Waiting for operation to be finalized...');
  const status = await operation.waitFinalExecution();
  console.log('Operation status:', OperationStatus[status]);
  if (status !== OperationStatus.Success) {
    throw new Error('Operation failed');
  }

  const events = await provider.getEvents({
    smartContractAddress: contractAddress,
    operationId: operation.id,
  });

  for (const event of events) {
    console.log(
      `Event: "${event.data}" received for operation: ${event.context.origin_operation_id}`,
    );
  }
}

async function callGetMessage() {
  const contractAddress = await getContractAddress();
  const provider = await getAccountProvider();

  const helloContract = new SmartContract(provider, contractAddress);
  const message = await helloContract.read(
    'getMessage',
    new Args().serialize(),
    {
      coins: Mas.fromString('0.01'),
    },
  );

  console.log('Message:', bytesToStr(message.value));
}

await callSetMessage('Hello, Massa friends!');

await callGetMessage();
