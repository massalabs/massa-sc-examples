// fires when script is first loaded
// can't do onInit directly here, because the DOM hasn't been loaded for options.html yet
// we just set an event listener for document.DOMContentLoaded - In that handler we can call onInit
// document.addEventListener('DOMContentLoaded', readpost, false);

import * as massa from './bundle-massa.min.js'

console.log(massa)

const baseAccount = {
  publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
  privateKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
  address: "A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
};
  
// const web3Client = massa.ClientFactory.createDefaultClient(
//   "https://labnet.massa.net/api/v2",
//   false,
//   baseAccount
// );

const blog_sc_address = "A17bNPYtupgBMtCs4odeEmyqaddkbLFpNhAmo1MBmEAHMRCbfju";

function readpost() {
  const params = new URLSearchParams(document.location.search);
  const post_nb = params.get("i");
  // var post_nb = localStorage.getItem('postNb');
  const post_key = "POST_" + post_nb;
  web3Client.smartContracts().getDatastoreEntry(
    blog_sc_address,
    post_key).then(function(post) {
      // document.getElementById("blog-post").innerHTML = marked.parse(post.candidate);
      // console.log(post.candidate);
  });
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

setInterval(readpost, 1000);
readpost()
