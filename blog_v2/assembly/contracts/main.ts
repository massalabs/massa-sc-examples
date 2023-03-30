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
    var n_blog_posts = 0;
    Storage.set("N_BLOG_POSTS", n_blog_posts.toString());
    return [];
}

export function post(binaryArgs: StaticArray<u8>): void {
    const argsDeser = new Args(binaryArgs);
    const post = argsDeser
    .nextString()
    .expect('Post argument is missing or invalid');
    var n_blog_posts = parseInt(Storage.get("N_BLOG_POSTS"));
    n_blog_posts += 1;
    Storage.set(_blogKey(n_blog_posts.toString()), post);
    Storage.set("N_BLOG_POSTS", n_blog_posts.toString());
}

export function deletePost(binaryArgs: StaticArray<u8>): void {
    const argsDeser = new Args(binaryArgs);
    const postIndex = argsDeser
    .nextString()
    .expect('Post index argument is missing or invalid');
    Storage.set(_blogKey(postIndex), "");
}

function _blogKey(postIndex: string): string {
    return "POST_" + postIndex;
}


