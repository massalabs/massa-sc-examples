import {
  fileToBase64,
  print,
  createSC,
  Address} from 'massa-sc-std/assembly/index';
import {TokenWrapper} from 'mscl-token/assembly/std/wrapper';

/**
 * Loads a smart contract into Massa blockchain.
 *
 * A smart contract is a WebAssembly module read from a wasm file
 * and encoded into base64.
 * `create_sc` takes that smart contract, sends it to the blockchain
 * and returns its address.
 *
 * @return {Address} - Address of the smart contract loaded into the blockchain.
 */
function loadSC(): Address {
  // Reads erc20_create.wasm file, encodes it in base64 and
  //   sets the result to `bytecode` variable.
  // There is a transformer that can do that, but it's not working
  //   with assemblyscript 0.20 (see https://github.com/massalabs/massa-sc-library/pull/29).
  // Therefore, this transformation is done at compilation time
  //   (see asbuild:use script in package.json).
  const bytecode = fileToBase64('./build/myToken.wasm');

  // Adds a new smart contract to the ledger and returns its address.
  return createSC(bytecode);
}

/**
 * Main function called at smart contract runtime.
 *
 * @param {string} _ - unused but mandatory. See https://github.com/massalabs/massa-sc-std/issues/18
 * @return {i32} - ?
 */
export function main(_: string): i32 { // eslint-disable-line @typescript-eslint/no-unused-vars
  const scAddress = loadSC();

  // Our smart contract is an token following Massa's standard token interface.
  // Smart contract author proposes a wrapped that makes interaction easier
  // following the same approach as an FFI bridge.
  const coin = new TokenWrapper(scAddress);

  // Thanks to the wrapper we can call high level function without
  // having to handle serializations, deserializations and type conversions
  const coinName = coin.name();

  const coinTotalSupply = coin.totalSupply();

  const symbol = coin.symbol();

  const bal = coin.balanceOf(
      Address.fromByteString(
          'A1MrqLgWq5XXDpTBH6fzXHUg7E8M5U2fYDAF3E1xnUSzyZuKpMh'
      )
  );

  print('\n' +
      'Smart contract addess: ' + scAddress.toByteString() + '\n' +
      'Balance: ' + bal.value().toString() + '\n' +
      'Token: ' + coinName + '\n' +
      'Symbol: ' + symbol + '\n' +
      'Total supply: ' +coinTotalSupply.value().toString());

  return 0;
}
