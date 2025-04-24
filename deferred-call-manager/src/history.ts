import { deserializeObj } from '@massalabs/massa-web3';
import { History } from './serializable/history';
import { getAccountProvider, getContractAddress } from './utils';

const provider = await getAccountProvider();
const contractAddress = await getContractAddress();

const keyFilter = 'hist';
const historyKeys = await provider.getStorageKeys(contractAddress, keyFilter);

const history = await provider.readStorage(contractAddress, historyKeys);

history.map((data) => {
  const execution = deserializeObj(data, 0, History).instance;
  console.log('execution', execution);
});
