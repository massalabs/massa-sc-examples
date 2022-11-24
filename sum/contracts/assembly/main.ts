import { generateEvent, Args } from "@massalabs/massa-as-sdk";

// This is my SC

function add(a: i32, b: i32): i32 {
    return a + b;
}

export function sum(stringifyArgs: string): string {
    const args = new Args(stringifyArgs);
    const a = args.nextI32();
    const b = args.nextI32();
    const result = add(a, b);
    generateEvent(
        `Sum (${a.toString()}, ${b.toString()}) = ${result.toString()}`
    );
    return result.toString();
}
