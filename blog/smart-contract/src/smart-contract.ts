import { generateEvent, Storage } from "@massalabs/massa-as-sdk";
import { JSON } from "json-as";

@json
export class PostArgs {
    author: string = "";
    date: string = "";
    tags: string = "";
    content: string = "";
}

export function post(_args: string): void {
    // author, date, content, tags
    generateEvent(_args);
    const args = JSON.parse<PostArgs>(_args);
    
    generateEvent(args.tags);
    generateEvent(args.date);
    generateEvent(args.content);
    generateEvent(args.tags);

    var n_blog_posts = Storage.get("N_BLOG_POSTS");
    
    _setAuthor(args.author, n_blog_posts);
    _setDate(args.date, n_blog_posts);
    _setTags(args.tags, n_blog_posts);
    _setContent(args.content, n_blog_posts);

    var new_n_blog_posts = U32.parseInt(n_blog_posts) + 1;
    Storage.set("N_BLOG_POSTS", new_n_blog_posts.toString());
}

export function deletePost(postIndex: string): void {
    Storage.set(_blogKey(postIndex), "");
}

function _setAuthor(author: string, n_blog_posts: string): void {
    Storage.set(_blogKey(n_blog_posts.toString()) + "_author", author);
}

function _setDate(date: string, n_blog_posts: string): void {
    Storage.set(_blogKey(n_blog_posts.toString()) + "_date", date);
}

function _setTags(tags: string, n_blog_posts: string): void {
    Storage.set(_blogKey(n_blog_posts.toString()) + "_tags", tags);
}

function _setContent(content: string, n_blog_posts: string): void {
    Storage.set(_blogKey(n_blog_posts.toString()) + "_content", content);
}

function _blogKey(postIndex: string): string {
    return "POST_" + postIndex;
}
