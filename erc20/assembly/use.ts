import {fileToBase64, print, createSC, Address, abi} from 'massa-sc-std/assembly/index';
import {TokenWrapper} from 'mscl-token/assembly/index';

/**
 * Loads a smart contract into Massa blockchain.
 *
 * A smart contract is a WebAssembly module read from a wasm file
 * and encoded into base64.
 * `create_sc` takes that smart contract, sends it to the blockchain
 * and returns it address.
 *
 * @return {Address} - Address of the smart contract loaded into the blockchain.
 */
function loadSC(): Address {
  print("A");
  const b = fileToBase64('./build/erc20_create.wasm');
  print("B");
  const a = createSC(b);
  print("C");
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
  print("1");
  const scAddress = loadSC();

  print("2");
  const coin = new TokenWrapper(scAddress);
  print("3");
  print(scAddress.toByteString());

  const coinName = coin.name();
  print("4");

  const coinTotalSUpply = coin.totalSupply();
  print("4b");

  const coinSymbol = coin.symbol();
    print("5");
  
  const bal = coin.balanceOf(
    Address.fromByteString("A1MrqLgWq5XXDpTBH6fzXHUg7E8M5U2fYDAF3E1xnUSzyZuKpMh")
    );
    print("6");

 // print(scAddress.toByteString() + //' balance: ' + bal.value().toString() + 
  //' of token: ' + coinName + ' total supply: ' + coin.symbol());

  print("7");
  
  return 0;
}
