import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import { Args, bytesToStr } from "@massalabs/massa-web3";
import { MassaContext } from "../App";

interface Post {
    Title: string;
    Author: string;
    Date: string;
    Tags: string;
    Content: string;
}

const CONTRACT_ADDRESS =
    "AS12CkgTr6Ch7ViYuTB4qVRJYwpap2TzTTsirREiSwfChdMY4oiQ4";

export default function ContractInteraction() {
    const { account } = useContext(MassaContext)!;

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [showPublish, setShowPublish] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);
    const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value);
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const togglePublish = () => setShowPublish(!showPublish);

    const fetchPosts = async () => {
        const result = await account?.callSC(
          CONTRACT_ADDRESS,
          "getPosts",
          new Uint8Array([]),
          BigInt(0),
          { isNPE: true, maxGas: BigInt(4294967295) }
        );
        if (result.returnValue.length > 0) {
          const uint8array = new Uint8Array(result.returnValue);
          const postsString = bytesToStr(uint8array);
          setPosts(JSON.parse(postsString) as Post[]);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, [account]);

    const publishPost = async () => {
        const post: Post = {
            Title: title,
            Author: author,
            Date: new Date().toLocaleDateString('en-GB'),
            Tags: tags,
            Content: content
        };
        account?.callSC(
            CONTRACT_ADDRESS,
            "post",
            new Args().addString(JSON.stringify(post)),
            BigInt(1)
        );
        setTimeout(() => {
            setTitle("");
            setAuthor("");
            setTags("");
            setContent("");
            setShowPublish(false);
        }, 5000);
    }

    return (
        <div className="relative bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-5xl p-8 box-border rounded-lg shadow-md mb-12 mx-auto">
            {!showPublish && !selectedPost ? (
                
                <div>
                    <button onClick={fetchPosts} className="refresh-button absolute top-4 right-4 bg-transparent border border-gray-400 px-2 py-1 rounded-md m-1">
                            Refresh Posts
                    </button>
                    {posts.map((post, index) => (
                        <div key={index} onClick={() => setSelectedPost(post)} className="post-preview cursor-pointer">
                            <p className="text-gray-500 text-xs text-left w-full">{post.Date}</p>
                            <h2 className="text-left mt-2 text-xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{post.Title.length > 90 ? post.Title.substring(0, 87) + '...' : post.Title}</h2>
                            <div className="flex flex-wrap mt-1 text-xs text-left w-full">
                                {post.Tags.split(',').map((tag, tagIndex) => (
                                    <div key={tagIndex} className="tag bg-transparent border border-gray-400 px-2 py-1 rounded-md m-1">{tag.trim()}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button 
                        className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white"
                        onClick={togglePublish}
                    >
                        Publish
                    </button>
                </div>
            ) : selectedPost ? (
                <div>
                    <button 
                        className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white mt-4"
                        onClick={() => setSelectedPost(null)}
                    >
                        Back
                    </button>
                    <p className="text-gray-500 text-xs text-left w-full overflow-auto padding-date">{selectedPost.Date}</p>
                    <h2 className="mt-2 text-xl font-bold divider" style={{wordBreak: 'break-all'}} >{selectedPost.Title}</h2>
                    <div className="overflow-auto text-left">
                    <span className="text-right text-sm">By </span>
                    <h3 className="inline-block"> {selectedPost.Author} </h3>
                </div>
                <div className="flex flex-wrap mt-1 text-xs text-left w-full divider">
                                {selectedPost.Tags.split(',').map((tag, tagIndex) => (
                                    <div key={tagIndex} className="tag bg-transparent border border-gray-400 px-2 py-1 rounded-md m-1">{tag.trim()}</div>
                                ))}
                            </div>
                <p className="mt-2 overflow-auto" style={{wordBreak: 'break-all'}}>{selectedPost.Content}</p>
                </div>
            ) : (
                <div className="publish-section">
                    <h3>Publish a new Post</h3>
                    <div>
                        <label>Title</label>
                        <input type="text" className="input" value={title} onChange={handleTitleChange} />
                    </div>
                    <div>
                        <label>Author</label>
                        <input type="text" className="input" value={author} onChange={handleAuthorChange} />
                    </div>
                    <div>
                        <label>Tags</label>
                        <input type="text" className="input" value={tags} onChange={handleTagsChange} />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea className="input" value={content} onChange={handleContentChange} />
                    </div>
                    <button 
                        className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white"
                        onClick={publishPost}
                    >
                        Submit Post
                    </button>
                    <button 
                        className="button flex justify-center items-center border border-green-500 p-3 text-green-500 rounded-md hover:bg-green-500 hover:text-white mt-4"
                        onClick={togglePublish}
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
}