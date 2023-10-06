import { ProviderSelect } from "./ProviderSelect";
// import { ProviderInfo } from "./ProviderInfo";
import { BlogPosts } from "./BlogPosts";
import { AddPost } from "./AddPost";

export default function Body() {
  return (
    <div className="body flex-col justify-center align-middle">
      <div className="flex-col">
        <ProviderSelect />
        {/* <ProviderInfo /> */}
        <AddPost />
        <BlogPosts />
        {/* <ContractInteraction /> */}
      </div>
    </div>
  );
}
