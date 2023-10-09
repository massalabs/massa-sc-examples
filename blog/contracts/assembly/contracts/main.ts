import { Storage, Context, generateEvent } from '@massalabs/massa-as-sdk';
import {
  Args,
  bytesToSerializableObjectArray,
  serializableObjectsArrayToBytes,
  stringToBytes,
} from '@massalabs/as-types';
import { Post } from './post';

const NUMBER_BLOG_POSTS = 'NUMBER_BLOG_POSTS';
const POST_KEY = 'POST';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): void {
  if (!Context.isDeployingContract()) {
    return;
  }

  Storage.set(NUMBER_BLOG_POSTS, '0');
  Storage.set(stringToBytes(POST_KEY), []);

  generateEvent('Blog Initialized');
}

export function addPost(_args: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(_args);

  const post = args
    .nextSerializable<Post>()
    .expect('Post argument is missing or invalid');

  let newIndex = u32(parseInt(Storage.get(NUMBER_BLOG_POSTS)) + 1);

  const posts = bytesToSerializableObjectArray<Post>(
    Storage.get(stringToBytes(POST_KEY)),
  ).unwrap();

  posts.push(post);

  Storage.set(stringToBytes(POST_KEY), serializableObjectsArrayToBytes(posts));
  Storage.set(NUMBER_BLOG_POSTS, newIndex.toString());

  return serializableObjectsArrayToBytes(posts);
}

export function getPosts(_: StaticArray<u8>): StaticArray<u8> {
  return Storage.get(stringToBytes(POST_KEY));
}

export function getPost(_args: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(_args);

  const index = args
    .nextString()
    .expect('Index argument is missing or invalid');

  const posts = bytesToSerializableObjectArray<Post>(
    Storage.get(stringToBytes(POST_KEY)),
  ).unwrap();

  return posts[u32(parseInt(index))].serialize();
}

export function getNumberPosts(_: StaticArray<u8>): StaticArray<u8> {
  return stringToBytes(Storage.get(NUMBER_BLOG_POSTS));
}
