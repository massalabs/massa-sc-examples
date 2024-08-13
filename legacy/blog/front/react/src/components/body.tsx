import { ProviderSelect } from "./ProviderSelect";
// import { ProviderInfo } from "./ProviderInfo";
import { BlogPosts } from "./BlogPosts";
import { AddPost } from "./AddPost";
import { bytesToSerializableObjectArray } from "@massalabs/massa-web3";
import { useState, useEffect } from "react";
import { Post } from "../const/post";
import { useWeb3 } from "../context/web3Context";
import { getPosts } from "../web3Call/posts";
import { ProviderInfo } from "./ProviderInfo";

export default function Body() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { client } = useWeb3();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [client]);

  const fetchPosts = async () => {
    if (!client) return;
    setLoading(true);
    try {
      const result = await getPosts(client);
      const posts = bytesToSerializableObjectArray<Post>(
        result.returnValue,
        Post
      );
      setPosts(posts.reverse());
    } catch (error) {}
    setLoading(false);
  };
  return (
    <div className="body flex-col justify-center align-middle">
      <div className="flex-col">
        <ProviderSelect />
        <ProviderInfo />
        {client && (
          <>
            <AddPost fetchPosts={fetchPosts} />
            <BlogPosts posts={posts} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
}
