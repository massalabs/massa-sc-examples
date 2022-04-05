import {include_base64, print, create_sc} from 'massa-sc-std';
import {Wrapper} from 'mscl-token/erc20/erc20w';

/**
 * Loads a smart contract into Massa blockchain.
 *
 * A smart contract is a WebAssembly module read from a wasm file
 * and encoded into base64.
 * `create_sc` takes that smart contract, sends it to the blockchain
 * and returns it address.
 *
 * @return {string} - Address of the smart contract loaded into the blockchain.
 */
function loadSC(): string {
  const b = include_base64('./build/erc20_create.wasm');
  const a = create_sc(b);
  return a;
}

/**
 * Main function called at smart contract runtime.
 *
 * TODO: clarify what and how arguments are passed.
 * TODO: Clarify what are the impact of teh returned value.
 *
 * @param {string} _args - Arguments passed to main function.
 * @return {i32} - ?
 */
export function main(_args: string): i32 {
  print('init');
  const scAddress = loadSC();
  print('loaded');
  const coin = new Wrapper(scAddress);
  print('wrapped');
  const coinName = coin.name();
  print('named');
  const bal = coin.balanceOf('123456');
  print('baled');
  print(scAddress + ' balance: ' + bal.toString() + ' of token: ' + coinName);
  print('end');
  return 0;
}
