/* eslint-disable no-console */
import {
  Args,
  Mas,
  OperationStatus,
  SmartContract,
} from '@massalabs/massa-web3';
import { getAccountProvider, getContractAddress } from './utils';

async function triggerAsyncHello(message: string) {
  const contractAddress = await getContractAddress();
  const provider = await getAccountProvider();

  console.log('Will trigger async hello...');

  const contract = new SmartContract(provider, contractAddress);
  const operation = await contract.call(
    'asyncHello', // function name
    new Args().serialize(), // arguments
    {
      // options
      coins: Mas.fromString('0.01'), // coins
      maxGas: BigInt(3_100_000), // gas limit
      fee: Mas.fromString('0.01'), // fee
    },
  );

  console.log(
    'asyncHello function called successfully, operation id:',
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

await triggerAsyncHello('Hello, Massa friends!');
