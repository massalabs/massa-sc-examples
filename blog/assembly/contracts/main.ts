import { Storage, callerHasWriteAccess, generateEvent } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!callerHasWriteAccess()) {
    return [];
  }
  const nBlogPosts = 0;
  // Set the initial value of N_BLOG_POSTS to 0 in the storage of the contract
  Storage.set("N_BLOG_POSTS", nBlogPosts.toString());
  // This function is used to emit an event to the blockchain
  generateEvent(`Blog initiated`);
  return [];
}

export function post(binaryArgs: StaticArray<u8>): void {
  const argsDeser = new Args(binaryArgs);
  // Get the post from the arguments and check if it is valid (not null)
  const post = argsDeser
    .nextString()
    .expect('Post argument is missing or invalid');
  let nBlogPosts = parseInt(Storage.get("N_BLOG_POSTS"));
  nBlogPosts += 1;
  // Store the post in the storage of the contract with the key POST_postIndex
  // The keys will have the following syntaxes: POST_1.0, POST_2.0, POST_3.0, etc.
  Storage.set(_blogKey(nBlogPosts.toString()), post);
  // Incrementing the value of N_BLOG_POSTS in the storage of the contract
  Storage.set("N_BLOG_POSTS", nBlogPosts.toString());
}

export function deletePost(binaryArgs: StaticArray<u8>): void {
  const argsDeser = new Args(binaryArgs);
  // Get the post index from the arguments and check if it is valid, we expect a string of the form "1.0" or "2.0", etc.
  const postIndex = argsDeser
    .nextString()
    .expect('Post index argument is missing or invalid');
    // Delete the post from the storage of the contract by setting its value to an empty string
  Storage.set(_blogKey(postIndex), "");
}

// This function is used within the contract to generate the key of a post that will be stored in the storage
function _blogKey(postIndex: string): string {
  return "POST_" + postIndex;
}


