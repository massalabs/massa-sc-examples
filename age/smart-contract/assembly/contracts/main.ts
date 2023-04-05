// The entry file of your WebAssembly module.
import { Args } from "@massalabs/as-types";
import { Storage, generateEvent } from "@massalabs/massa-as-sdk";

/**
 * This function is the constructor, it is always called once on contract deployement.
 * 
 * In this case, the constructor initiate's the store by adding a 'person' entry with a default 'age' value.
 * @remarks 
 *  If the entry doesn't exist the person is created.
 *  It also generates an event that indicates the changes that are made.
 * 
 * @param args The serialized arguments (unused).
 * 
 * @returns none
 */

export function constructor(_: StaticArray<u8>): StaticArray<u8> {
    let age = new Args().add(1 as u32);
    let name = new Args().add("alice");
    
    Storage.set(name.serialize(), age.serialize());
    return [];
}


/**
 * This functions changes the age of somone by a given name and a given new age value.
 * 
 * @remarks 
 *  If the entry doesn't exist the person is created.
 *  It also generates an event that indicates the changes that are made.
 * 
 * @param args The serialized arguments.
 * 
 * @returns none
 */
export function change_age(args: StaticArray<u8>): StaticArray<u8> {
    let args_deserialized = new Args(args);
    
    let name = args_deserialized.nextString().expect("Missing name argument.");
    let age = args_deserialized.nextU32().expect("Missing age argument.");

    let age_encoded = new Args().add(age).serialize();
    let name_encoded = new Args().add(name).serialize();

    Storage.set(name_encoded, age_encoded);

    generateEvent("Changed age of '"+name+"' to '"+age.toString()+"'");
    return [];
}

/**
 * This functions retreives the age of somone by a given name.
 * 
 * @remarks 
 *  If the entry doesn't exist the execution is aborted.
 * 
 * @param args The serialized arguments.
 * 
 * @returns The serialized 'age' found.
 */
export function get_age(args: StaticArray<u8>): StaticArray<u8> {
  let args_deserialized = new Args(args);
  let name = args_deserialized.nextString().expect("Missing name argument.");
  let name_encoded = new Args().add(name).serialize();
  
  if (Storage.has(name_encoded)) {
    let age = Storage.get(name_encoded);
  
    return new Args().add(age).serialize();
  } else {
    abort("No such person's age is stored.")
    return [];
  } 
  return [];
}

