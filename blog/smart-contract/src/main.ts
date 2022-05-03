import { create_sc, include_base64, generate_event, Storage, call } from "massa-sc-std";

function initialize(): string {
    const bytes = include_base64('./build/smart-contract.wasm');
    const blog = create_sc(bytes);
    var n_blog_posts = 0;
    Storage.set_data_for(blog, "N_BLOG_POSTS", n_blog_posts.toString());
    return blog
}

export function main(_args: string): void {
    let blog = initialize();
    generate_event("Deployed blog SC at: " + blog);
    // call(blog, "post", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 0)
}
