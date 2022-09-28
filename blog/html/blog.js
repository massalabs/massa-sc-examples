const baseAccount = {
  publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
  secretKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
  address: "A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
};

const blog_sc_address = "A17bNPYtupgBMtCs4odeEmyqaddkbLFpNhAmo1MBmEAHMRCbfju";

function readpost() {
  const params = new URLSearchParams(document.location.search);
  const post_nb = params.get("i");
  const post_key = "POST_" + post_nb;

  window.massa.ClientFactory.createDefaultClient(
    "https://test.massa.net/api/v2",
    false,
    baseAccount
  ).then(
    function(web3Client) {
      web3Client.publicApi().getDatastoreEntries([{address: blog_sc_address, key: post_key}]).then(
        function(post) {
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
