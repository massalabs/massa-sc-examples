import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

dotenv.config();

// Paste the address of the deployed contract here
export const CONTRACT_ADDR =
  'AS1HCv1N8rPT6XqAP3krLje1AEif745gBjbVischzkp2WTLdA1JP';

export function getScByteCode(folderName: string, fileName: string): Buffer {
  // Obtain the current file name and directory paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(path.dirname(__filename));
  return readFileSync(path.join(__dirname, folderName, fileName));
}
