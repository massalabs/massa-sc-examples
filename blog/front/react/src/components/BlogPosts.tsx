import { useEffect, useState } from "react";
import { useWeb3 } from "../context/web3Context";
import { getPosts } from "../web3Call/posts";
import { bytesToSerializableObjectArray } from "@massalabs/massa-web3";
import { Post } from "../const/post";

const fakePosts = [
  new Post(
    "Hello world",
    "This is my first post",
    "2021-09-01",
    "Massa",
    "Hello world"
  ),
  new Post(
    "Hello world",
    "This is my first post",
    "2021-09-01",
    "Massa",
    "Hello world"
  ),
  new Post(
    "Hello world",
    "This is my first post",
    "2021-09-01",
    "Massa",
    "Hello world"
  ),
  new Post(
    "Hello world",
    "This is my first post",
    "2021-09-01",
    "Massa",
    "Hello world"
  ),
  new Post(
    "Hello world",
    "This is my first post",
    "2021-09-01",
    "Massa",
    "Hello world"
  ),
  new Post(
    "Hello world",
    "This is my first post",
    "2021-09-01",
    "Massa",
    "Hello world"
  ),
];

export const BlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>(fakePosts);
  const { client } = useWeb3();

  useEffect(() => {
    // fetchPosts();
  }, [client]);

  const fetchPosts = async () => {
    if (!client) return;
    const result = await getPosts(client);
    const posts = bytesToSerializableObjectArray<Post>(
      result.returnValue,
      Post
    );
    setPosts(posts);
  };

  return (
    <div className="flex flex-col px-4 w-full">
      <div className="flex flex-col justify-center items-start w-full lg:px-10 pb-40">
        {posts.map((post, i) => (
          <div key={post.title + i} className="w-full">
            <div className="divider"></div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="w-full">
                <h1 className="text-4xl font-bold lg:text-left">
                  {post.title}
                </h1>
                <p className="text-gray-700 text-regular text-base text-left  pt-4">
                  {post.content}
                </p>
              </div>
              <div className="lg:grid lg:mx-auto w-full  lg:items-end">
                <div className="flex flex-col mt-4 lg:mt-0">
                  <h1 className="text-1xl font-bold text-right">
                    {post.author}
                  </h1>
                  <p className="text-gray-700 text-right">{post.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
