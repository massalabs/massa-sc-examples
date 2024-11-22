import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { SCEvent } from '@massalabs/massa-web3';

dotenv.config();

export function getScByteCode(folderName: string, fileName: string): Buffer {
  // Obtain the current file name and directory paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(path.dirname(__filename));
  return readFileSync(path.join(__dirname, folderName, fileName));
}

export function logBalance(
  prefix: string,
  balance: bigint,
  symbol: string,
): void {
  console.log(`${prefix} ${symbol} Balance: ${balance.toString()}`);
}

export function logEvents(event: SCEvent, i: number): void {
  console.log(`'Event nº ${i + 1}: '${event.data.toString()}`);
}
