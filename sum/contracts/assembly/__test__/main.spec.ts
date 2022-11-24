import { Args } from "@massalabs/massa-as-sdk";
import * as main from "../main";

describe("Sum test", () => {
    test("sum", () => {
        const args = new Args();
        args.add(21 as i32);
        args.add(20 as i32);
        const got = main.sum(args.serialize());
        const want = "41";
        if (got != want) {
            error(got.toString() + ", " + want.toString() + " was expected.");
            return;
        }
    });
});
