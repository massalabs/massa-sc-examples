export * from 'mscl-token/assembly/std/impl';

// For this example we just want to rename the token
// Everything else will be kept as defined in the mscl-token/erc20 module

/**
 * Overwrites `name` function with wanted functionality.
 *
 * @param {string} _ - unused but mandatory. See https://github.com/massalabs/massa-sc-std/issues/18
 * @return {string} - the new token name.
 */
export function name(_:string): string {
  return 'Massa Example token';
}
