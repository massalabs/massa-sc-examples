import { Storage, Context, generateEvent } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return;
  }
  const nBlogPosts = 0;
  // Set the initial value of N_BLOG_POSTS to 0 in the storage of the contract
  Storage.set('N_BLOG_POSTS', nBlogPosts.toString());
  // This function is used to emit an event to the blockchain
  generateEvent('Blog initiated');
}

export function post(_args: StaticArray<u8>): string {
  const args = new Args(_args);
  // Get the post from the arguments and check if it is valid (not null)
  const post = args.nextString().expect('Post argument is missing or invalid');

  let postLastIndex = 0;
  if (Storage.get<string>('N_BLOG_POSTS') !== '') {
    postLastIndex = parseInt(Storage.get('N_BLOG_POSTS')) as i32;
  }
  postLastIndex += 1;
  // Store the post in the storage of the contract with the key POST_postIndex
  // The keys will have the following syntaxes: POST_1, POST_2, POST_3, etc.
  Storage.set(blogKey(postLastIndex.toString()), post);
  // Incrementing the value of N_BLOG_POSTS in the storage of the contract
  Storage.set('N_BLOG_POSTS', postLastIndex.toString());
  return post;
}

export function deletePost(_args: StaticArray<u8>): void {
  const args = new Args(_args);
  // Get the post index from the arguments and check if it is valid, we expect a string of the form "1.0" or "2.0", etc.
  const postIndex = args
    .nextString()
    .expect('Post index argument is missing or invalid');
  // Delete the post from the storage of the contract by setting its value to an empty string
  Storage.set(blogKey(postIndex), '');
}

// This function is used within the contract to generate the key of a post that will be stored in the storage
export function blogKey(postIndex: string): string {
  return 'POST_' + postIndex;
}

export function getPosts(): StaticArray<u8> {
  let posts = '';
  let postLastIndex = 0;

  // Check if N_BLOG_POSTS exists in the storage and if it does, retrieve the value
  if (Storage.get<string>('N_BLOG_POSTS') !== '') {
    postLastIndex = parseInt(Storage.get('N_BLOG_POSTS')) as i32;
  }

  // Loop through all posts by their indices
  for (let i = 1; i <= postLastIndex; i++) {
    const post = Storage.get(blogKey(i.toString()));
    if (post !== '') {
      // Check if post exists
      if (posts !== '') posts += ','; // If it's not the first post, prepend comma
      posts += post; // Concatenate posts
    }
  }

  posts = '[' + posts + ']'; // Wrap posts string with array brackets

  return stringToBytes(posts); // Return all posts as an array string
}
