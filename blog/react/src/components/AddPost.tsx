// Use DaisyUi
// Post button
// Popup to create the new Post

import { useState } from "react";
import { Post } from "../const/post";
import { addPost } from "../web3Call/posts";
import { useWeb3 } from "../context/web3Context";

export const AddPost = () => {
  const { client } = useWeb3();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (title === "" || content === "" || author === "" || !client) return;

    const newPost = new Post(title, author, date, tags.toString(), content);

    addPost(client, newPost);

    setTitle("");
    setContent("");
    setAuthor("");
    setDate("");
    setTags([]);
    setOpen(false);
  };

  if (open) {
    return (
      <div className=" absolute bg-white w-full h-full top-0 left-0 z-10 px-4 py-8">
        <div className="flex flex-col w-full items-end">
          <button
            className="btn btn-circle btn-outline"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col w-full h-4/5 justify-center ">
          <div className="grid grid-cols-2 grid-rows-3 gap-4 h-3/6 w-2/5 mx-auto">
            <div className="flex flex-col w-full">
              <label className="label">
                <span className="label-text text-lg font-semibold ">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="label">
                <span className="label-text text-lg font-semibold ">
                  Author
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full col-span-2">
              <label className="label">
                <span className="label-text text-lg font-semibold ">
                  Content
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered textarea-primary w-full "
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col w-full col-span-2 justify-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-start px-4 lg:px-14 underline underline-offset-4 font-Poppins font-bold text-lg text-primary hover:text-primary-focus">
      <button onClick={() => setOpen(true)}>Add Post</button>
    </div>
  );
};
