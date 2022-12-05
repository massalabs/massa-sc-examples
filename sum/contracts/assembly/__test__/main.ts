import { Args } from "@massalabs/massa-as-sdk";
import * as main from "../main";

describe("Sum test", (): i32 => {
    test("sum", (): i32 => {
        const args = new Args();
        args.add(21 as i32);
        args.add(20 as i32);
        const got = new Args(main.sum(args.serialize())).nextI32();
        const want = 41;
        if (got != want) {
            error(got.toString() + ", " + want.toString() + " was expected.");
            return TestResult.Failure;
        }
        return TestResult.Success;
    });
    return TestResult.Success;
});
