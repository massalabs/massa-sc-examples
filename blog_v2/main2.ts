import { Storage, generateEvent, Address, transferCoins, callerHasWriteAccess } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';



/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
    if (!callerHasWriteAccess()) {
        return [];
      }
    var n_blog_posts = 0;
    Storage.set("N_BLOG_POSTS", stringToBytes(n_blog_posts.toString()));
    return [];
} 


export function post(post: string): void {
    var n_blog_posts = U32.parseInt(Storage.get_data("N_BLOG_POSTS"));
    Storage.set_data(_blogKey(n_blog_posts.toString()), post);
    n_blog_posts += 1;
    Storage.set_data("N_BLOG_POSTS", n_blog_posts.toString());
}

export function deletePost(postIndex: string): void {
    Storage.set_data(_blogKey(postIndex), "");
}

function _blogKey(postIndex: string): string {
    return "POST_" + postIndex;
}


