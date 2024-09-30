import { Account, deserializeObj, Web3Provider } from '@massalabs/massa-web3';
import { History } from './serializable/history';
import { CONTRACT_ADDR } from './utils';

const rpcUrl = 'https://labnet.massa.net/api/v2:33035';
const account = await Account.fromEnv();
const provider = Web3Provider.fromRPCUrl(rpcUrl, account);

const keyFilter = 'hist';
const historyKeys = await provider.getStorageKeys(CONTRACT_ADDR, keyFilter);

const history = await provider.readStorage(CONTRACT_ADDR, historyKeys);

history.map((data) => {
  const execution = deserializeObj(data, 0, History).instance;
  console.log('execution', execution);
});
