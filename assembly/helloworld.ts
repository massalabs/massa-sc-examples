import { get_balance, print } from "massa-sc-std";

export function main(_args: string): void {
    print ('Balance SC :' + get_balance().toString());
}
