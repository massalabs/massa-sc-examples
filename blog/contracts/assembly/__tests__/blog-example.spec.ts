// TODO: Tags should be an array of strings
// TODO: Add pagination

import {
  bytesToString,
  bytesToSerializableObjectArray,
} from '@massalabs/as-types';
import { Storage, mockAdminContext } from '@massalabs/massa-as-sdk';
import {
  addPost,
  constructor,
  getNumberPosts,
  getPosts,
} from '../contracts/main';
import { Post } from '../contracts/post';

const post1 = new Post('My Post', 'Me', '19/09/2021', 'tag2', 'My content');
const post2 = new Post('My Post 2', 'Me', '20/09/2021', 'tag2', 'My content 2');
const post3 = new Post('Long', 'Me', '21/09/2021', 'tag2', 'a'.repeat(301));

describe('constructor tests', () => {
  test('Storage correctly initialized', () => {
    mockAdminContext(true);
    constructor([]);
    const numberBlogPosts = bytesToString(getNumberPosts([]));
    expect(numberBlogPosts).toStrictEqual('0');
    const posts = bytesToSerializableObjectArray<Post>(getPosts([])).unwrap();
    expect(posts).toStrictEqual([]);
  });
});

describe('Posts', () => {
  test('addPost', () => {
    addPost(post1.serialize());
    const numberBlogPosts = bytesToString(getNumberPosts([]));
    expect(numberBlogPosts).toStrictEqual('1');
    const posts = bytesToSerializableObjectArray<Post>(getPosts([])).unwrap();
    expect(posts).toStrictEqual([post1]);
  });

  test('getPosts', () => {
    addPost(post2.serialize());
    const numberBlogPosts = bytesToString(getNumberPosts([]));
    expect(numberBlogPosts).toStrictEqual('2');
    const posts = bytesToSerializableObjectArray<Post>(getPosts([])).unwrap();
    expect(posts).toStrictEqual([post1, post2]);
  });

  // test content too long
  test('addPost content too long', () => {
    const call = (): void => {
      addPost(post3.serialize());
    };

    expect(call).toThrow();
  });
});
