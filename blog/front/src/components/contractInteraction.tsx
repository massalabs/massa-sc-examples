import { useEffect, useState, ChangeEvent } from "react";
import { IAccount, providers } from "@massalabs/wallet-provider"
import { Args, bytesToStr, IClient, ClientFactory, strToBytes} from "@massalabs/massa-web3";

interface Post {
    Title: string;
    Author: string;
    Date: string;
    Tags: string;
    Content: string;
}

const CONTRACT_ADDRESS =
    "AS12tPCMbNdYi7w3PL6roqbNBafMPa8uSnox2Vg3TaDu6qyQNnWbH";

export default function ContractInteraction() {
    const [errorMessage, setErrorMessage] = useState<any>("");
    const [client, setClient] = useState<IClient | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [lastOpId, setlastOpId] = useState<string | null>(null);

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


    useEffect(() => {
        const registerAndSetProvider = async () => {
          try {
            let provider = (await providers(true, 10000))[0];
            let accounts = await provider.accounts();
            if (accounts.length === 0) {
              setErrorMessage("No accounts found");
              return;
            }
            setAccount(accounts[0]);
            if (!account || !provider) {
              return;
            }
            setClient(await ClientFactory.fromWalletProvider(provider, account));
          } catch (e) {
            console.log(e);
            setErrorMessage("Please install massa station and the wallet plugin of Massa Labs and refresh.");
          }
        };
    
        registerAndSetProvider();
      }, [account]);

    const fetchPosts = async () => {
        let posts_string = "[";
        try {
            if (!account || !client) {
              return;
            }
        const n_posts_str = await client.publicApi().getDatastoreEntries([{ address: CONTRACT_ADDRESS, key: strToBytes('N_BLOG_POSTS') }]);
        if(!n_posts_str[0]) {
            return;
        }
        if (n_posts_str[0].candidate_value !== null) {
            const numberOfPosts = parseInt(bytesToStr(n_posts_str[0].candidate_value));
            for (let i = 1; i <= numberOfPosts; i++) {
                const i_post = await client.publicApi().getDatastoreEntries([{ address: CONTRACT_ADDRESS, key: strToBytes('POST_'+i.toString()) }]);
                if (!i_post[0]){
                    return;
                }
                if (i_post[0].candidate_value !== null) {
                let individual_post = bytesToStr(i_post[0].candidate_value);
                if(i===numberOfPosts){
                    posts_string = posts_string+individual_post+']'
                }
                else{
                    posts_string = posts_string+individual_post+','
                }
            }
            }
          setPosts(JSON.parse(posts_string) as Post[]);
        }
        } catch (error) {
        console.error(error);
      }
      };

      const publishPost = async () => {
        const post: Post = {
            Title: title,
            Author: author,
            Date: new Date().toLocaleDateString('en-GB'),
            Tags: tags,
            Content: content
        };
        try {
          if (!account || !client) {
            return;
          }
          let opId = await client.smartContracts().callSmartContract({
            targetAddress: CONTRACT_ADDRESS,
            functionName: "post",
            parameter: new Args().addString(JSON.stringify(post)).serialize(),
            maxGas: BigInt(1000000),
            coins: BigInt(0),
            fee: BigInt(0),
          });
          setlastOpId(opId);
        } catch (error) {
          console.error(error);
        } 
      };

      const emptyPost = async () => {
        setTimeout(() => {
            setTitle("");
            setAuthor("");
            setTags("");
            setContent("");
            setShowPublish(false);
        }, 5000);
        // setTimeout(() => {
        //     setlastOpId(null);
        //   }, 30000);
    }

    return (
        <div className="relative bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-5xl p-8 box-border rounded-lg shadow-md mb-12 mx-auto">
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
                    <p className="mt-2 overflow-auto text-left" style={{wordBreak: 'break-all'}}>{selectedPost.Content}</p>
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
                        onClick={() => { publishPost(); emptyPost(); }}
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
            {lastOpId && <div className="text-blue-500">Last Op id: {lastOpId}</div>}
        </div>
    );
}