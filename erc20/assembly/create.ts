export * from 'mscl-token/erc20/erc20';

// For this example we just want to rename the token
// Everything else will be kept as defined in the mscl-token/erc20 module

/**
 * Overwrite name function with wanted functionality.
 *
 * @param {string} _ - Unused but mandatory. See https://github.com/massalabs/massa-sc-std/issues/18
 * @return {string} - the new toke name.
 */
export function name(_:string): string {
  return 'Massa Example token';
}
