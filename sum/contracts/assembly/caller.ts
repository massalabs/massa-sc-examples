import { Address, Args, call } from "@massalabs/massa-as-sdk";

export function main(): i32 {
    const address = new Address("A12GM2sWKSUEQ4S6k8fa18Zs3g5at4PuLZQkzAssXxoFsWYtXU6P");
    call(address, "sum", new Args().add(21 as i32).add(20 as i32), 0);
    return 0;
}
