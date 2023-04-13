import { NoArg, Args } from '@massalabs/as-types';
import * as main from '../contracts/main';
import { Storage } from '@massalabs/massa-as-sdk';

// The describe function is used to group related tests together.
// In this case, we're grouping tests related to the `main` function.
describe('main function', () => {
  // The it function is used to define individual test cases.
  // In this case, we're testing that the `constructor` function doesn't throw an error when called with no arguments.
  it('should not throw with no arguments', () => {
    // We're using the expect function to make an assertion about the behavior of the `constructor` function.
    // Specifically, we're expecting that calling `main` with serialized `constructor` will not throw an error.
    expect(
      // Using the `() => void` function type is mandatory according to the `as-pect` documentation.
      () => {
        main.constructor(NoArg.serialize());
      },
    ).not.toThrow();
  });
});


// Testing the _blogKey function with a valid post index
describe('Blog Key', () => {
  test('blogkey', () => {
    expect<string>(main.blogKey('1')).toBe("POST_1");
  });
});

// Testing the post function with an invalid post
describe('Post function with invalid post', () => {
  test('post', () => {
    expect(() => {
      main.post(new Args()
      // the function expects a post index as a string, but we're passing a number
        .add(1 as u32)
        .serialize(),);
    }).toThrow("Argument invalid");
  });
});


// Testing the post function with a valid post : First Post
describe('Post function with valid post', () => {
  test('post', () => {
    const args = new Args();
    args.add("First Post" as string);

    main.post(args.serialize());

    const updatedNBlogPosts = parseInt(Storage.get("N_BLOG_POSTS")) as i32;
    expect(updatedNBlogPosts).toBe(1);
    // Check if the post has been properly stored in the storage of the contract
    const storedPost = Storage.get<string>(main.blogKey(updatedNBlogPosts.toString()));
    expect(storedPost).toBe("First Post");
  });
});


describe('Delete Post function with valid post index', () => {
  test('delete existing post', () => {
    // Using a valid post index : 1
    const postKey = main.blogKey('1');
    const args = new Args();
    args.add("1" as string);
    main.deletePost(args.serialize());
    const deletedPost = Storage.get<string>(postKey);
    expect<string>(deletedPost).toBe(""); // Check if the post has been deleted
  });
});

describe('Delete Post function with invalid post index', () => {
  test('delete existing post', () => {
    expect(() => {
      main.deletePost(new Args()
      // the function expects a post index as a string, but we're passing a number
        .add(1 as u32)
        .serialize(),);
    }).toThrow("Argument invalid");
  });
});