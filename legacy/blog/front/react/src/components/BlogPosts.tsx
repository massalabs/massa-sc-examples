import { Post } from "../const/post";

export const BlogPosts = ({
  posts,
  loading,
}: {
  posts: Post[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="bg-white w-full h-96 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold">Fetching Posts</h2>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col px-4 w-full">
      <div className="flex flex-col justify-center items-start w-full lg:px-10 pb-40">
        {posts.length === 0 && (
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl font-bold">No posts yet</h1>
            <p className="text-gray-700 text-regular text-base pt-4">
              Be the first to add a post
            </p>
          </div>
        )}
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
