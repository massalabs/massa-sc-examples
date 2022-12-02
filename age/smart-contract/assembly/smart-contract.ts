/* Tic Tac Toe Implementation for Massa Labs
 *
 * */
import { Storage, generateEvent, Args, toBytes, fromBytes } from "@massalabs/massa-as-sdk";

export function initialize(_args: StaticArray<u8>): void {
    let age = new Args();
    age.add(1 as u32);
    Storage.set(toBytes("alice"), age.serialize());
}

export function change_age(args: StaticArray<u8>): void {
    let args_deserialized = new Args(args);
    let name = args_deserialized.nextString();
    let age = args_deserialized.nextU32();
    let age_encoded = new Args();
    age_encoded.add(age);
    Storage.set(toBytes(name), age_encoded.serialize());
}