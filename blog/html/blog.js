function readpost() {
  const params = new URLSearchParams(document.location.search);
  const post_nb = params.get("i");
  const post_key = "POST_" + post_nb + "_content";

  window.massa.ClientFactory.createDefaultClient(
    rpc_url,
    false,
    baseAccount
  ).then(
    function(web3Client) {
      web3Client.publicApi().getDatastoreEntries([{address: blog_sc_address, key: post_key}]).then(
        function(post) {
          console.log(post[0].candidate);
          console.log(document.getElementById("blog-post"));
          document.getElementById("blog-post").innerHTML = marked.parse(post[0].candidate);
        }
      );
    }
  )

  let blog_post = document.getElementById("post");
  if (blog_post) {
    console.log(blog_post.childNodes[0]);
    // let post2 = document.createElement("p");
    // blog_post.nodeValue = "new value";
    const newText = document.createTextNode('Post');
    blog_post.childNodes[0].replaceWith(newText);
    console.log(blog_post);
    // blog_post.appendChild(post2);
  }
  console.log(post_key);
}

// setInterval(readpost, 1000);
readpost()
