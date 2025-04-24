import { SmartContract } from '@massalabs/massa-web3';
import { getAccountProvider, getContractAddress } from './utils';

const provider = await getAccountProvider();
const contractAddress = await getContractAddress();

const contract = new SmartContract(provider, contractAddress);
const operation = await contract.call('stop');

await operation.waitSpeculativeExecution();
console.log(
  `Recursive deferred call successfully stopped. OperationId: ${operation.id}`,
);
