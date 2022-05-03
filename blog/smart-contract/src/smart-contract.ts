import { Storage } from "massa-sc-std";

export function post(post: string): void {
    var n_blog_posts = U32.parseInt(Storage.get_data("N_BLOG_POSTS"));
    Storage.set_data(_blogKey(n_blog_posts.toString()), post);
    n_blog_posts += 1;
    Storage.set_data("N_BLOG_POSTS", n_blog_posts.toString());
}

export function deletePost(postIndex: string): void {
    Storage.set_data(_blogKey(postIndex), "");
}

function _blogKey(postIndex: string): string {
    return "POST_" + postIndex;
}
