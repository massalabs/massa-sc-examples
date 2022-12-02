import { event, setStorage } from "../main";
import { Address, Storage, toBytes } from "@massalabs/massa-as-sdk";

describe("A group of test", (): i32 => {
    test("A test throwing an error", (): i32 => {
        event(new StaticArray<u8>(0));
        const got = 42;
        const want = 41;
        if (got != want) {
            error(got.toString() + ", " + want.toString() + " was expected.");
            return TestResult.Success; //inversed to showcase a test failure and pass CI
        }
        return TestResult.Failure;
    });
    return TestResult.Success;
});

describe("An other group of test", (): i32 => {
    test("Testing the Storage", (): i32 => {
        setStorage(new StaticArray<u8>(0));
        assert(
            Storage.getOf(new Address("A12E6N5BFAdC2wyiBV6VJjqkWhpz1kLVp2XpbRdSnL1mKjCWT6oR"), toBytes("test")) ==
                toBytes("value"),
            "Test failed",
        );
        return TestResult.Success;
    });

    return TestResult.Success;
});
