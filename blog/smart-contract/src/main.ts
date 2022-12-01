import { createSC, fileToBase64, generateEvent, Storage, call } from "@massalabs/massa-as-sdk";

function initialize(): string {
    const bytes = fileToBase64('./build/smart-contract.wasm');
    const blog = createSC(bytes);
    var n_blog_posts = 0;
    Storage.setOf(blog, "N_BLOG_POSTS", n_blog_posts.toString());
    return blog.toByteString()
}

export function main(_args: string): void {
    let blog = initialize();
    generateEvent("Deployed blog SC at: " + blog);
    // call(blog, "post", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 0)
}
