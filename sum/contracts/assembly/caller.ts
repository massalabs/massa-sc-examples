import { Address, Args, call } from "@massalabs/massa-as-sdk";

export function main(): i32 {
    const address = new Address(
        "A1PjpgXyXSBeiG1rbXCP4ybhVccYzpysDKYmkymXWd81idutaD9"
    );
    call(
        address,
        "sum",
        new Args()
            .add(21 as i32)
            .add(20 as i32)
            .serialize(),
        0
    );
    return 0;
}
