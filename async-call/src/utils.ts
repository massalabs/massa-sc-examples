import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import { Account, Web3Provider } from '@massalabs/massa-web3';

dotenv.config();

export async function getContractAddress() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error('CONTRACT_ADDRESS is not set in .env file');
  }
  return contractAddress;
}
export function getScByteCode(folderName: string, fileName: string): Buffer {
  // Obtain the current file name and directory paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(path.dirname(__filename));
  return readFileSync(path.join(__dirname, folderName, fileName));
}

export async function getAccountProvider() {
  const account = await Account.fromEnv();

  let provider: Web3Provider;
  if (process.env.JSON_RPC_URL_PUBLIC) {
    const rpcUrl = process.env.JSON_RPC_URL_PUBLIC;
    provider = Web3Provider.fromRPCUrl(rpcUrl, account);
  } else {
    provider = Web3Provider.buildnet(account);
  }
  return provider;
}
