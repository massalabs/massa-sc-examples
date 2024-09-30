import { Account, SmartContract, Web3Provider } from '@massalabs/massa-web3';
import { CONTRACT_ADDR } from './utils';

const rpcUrl = 'https://labnet.massa.net/api/v2:33035';
const account = await Account.fromEnv();
const provider = Web3Provider.fromRPCUrl(rpcUrl, account);

const contract = new SmartContract(provider, CONTRACT_ADDR);
const operation = await contract.call('stop');

await operation.waitSpeculativeExecution();
console.log(
  `Recursive deferred call successfully stopped. OperationId: ${operation.id}`,
);
