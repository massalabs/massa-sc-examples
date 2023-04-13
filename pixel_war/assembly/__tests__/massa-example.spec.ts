import { NoArg, Args } from '@massalabs/as-types';
import * as main from '../contracts/main';

// The describe function is used to group related tests together.
// In this case, we're grouping tests related to the `main` function.
describe('main function', () => {
  // The it function is used to define individual test cases.
  // In this case, we're testing that the `constructor` function doesn't throw an error when called with no arguments.
  it('should not throw with no arguments', () => {
    // We're using the expect function to make an assertion about the behavior of the `constructor` function.
    // Specifically, we're expecting that calling `main` with serialized `constructor` will not throw an error.
    expect(
      // Using the `() => void` function type is mandatory according to the `as-pect` documentation.
      () => {
        main.constructor(NoArg.serialize());
      },
    ).not.toThrow();
  });
});