const baseAccount = {
  publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
  secretKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
  address: "A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
};

// async function initializeClient() {
//   window.massa.ClientFactory.createDefaultClient(
//     "https://test.massa.net/api/v2",
//     false,
//     baseAccount
//   ).then(function(client) {
//     web3Client = client;
// });
// }

var web3Client = null;

const blog_sc_address = "A17bNPYtupgBMtCs4odeEmyqaddkbLFpNhAmo1MBmEAHMRCbfju";

async function publish() {
  const txt = document.getElementById("publish-post").value;
  console.log(txt)
  window.massa.ClientFactory.createDefaultClient(
    "https://test.massa.net/api/v2",
    false,
    baseAccount
  ).then((web3Client) => {
    web3Client.smartContracts().callSmartContract({
      fee: 0,
      gasPrice: 0,
      maxGas: 200000,
      parallelCoins: 0,
      sequentialCoins: 0,
      targetAddress: blog_sc_address,
      functionName: "post",
      parameter: txt,
  }, baseAccount).then(function(tx_id) {
        alert('Your post was successfully submitted. Operation id:\n' + tx_id);
        console.log(tx_id);
      }
    );
  })
}

function readpost(i) {
  var post_nb = localStorage.getItem('postNb');
  const post_key = "POST_" + post_nb;
  web3Client.smartContracts().getDatastoreEntry(
    blog_sc_address,
    post_key).then(function(post) {
      document.getElementById("blog-post").innerHTML = marked.parse(post.candidate);
      console.log(post.candidate);
  });
}

function readpost() {
  const params = new URLSearchParams(document.location.search);
  // const post_nb = params.get("i");
  // var post_nb = localStorage.getItem('postNb');
  const post_key = "POST_" + post_nb;
  console.log(post_nb);
  if (post_nb !== null) {
    console.log('tete');
    web3Client.smartContracts().getDatastoreEntry(
    blog_sc_address,
    post_key).then(function(post) {
      // console.log(post.candidate);
      let blog_post = document.getElementById("post");
      if (blog_post) {
        document.getElementById("blog-post").innerHTML = marked.parse(post.candidate);
        // console.log(blog_post.childNodes[0]);
        // // let post2 = document.createElement("p");
        // // blog_post.nodeValue = "new value";
        // // const newText = document.createTextNode('Post');
        // const newText = document.createTextNode(post.candidate);
        // blog_post.childNodes[0].replaceWith(newText);
        // console.log(blog_post);
        // blog_post.appendChild(post2);
      }
    });
    console.log(post_key);
  }
}

post_nb = null;
function preview() {
  const post_key = "N_BLOG_POSTS"
  web3Client.smartContracts().getDatastoreEntry(
    blog_sc_address,
    post_key).then(function(n_posts_str) {
      let n_posts = parseInt(n_posts_str.candidate);
      let posts_list = document.getElementById("posts-list");
      // post_list.innerHTML = "";
    
      if (posts_list) {
        let psts_a = [];
        let psts_h = [];
        let psts_p = [];
        for (let i = 0; i < n_posts; i++) {
          let pst_a = document.createElement("A");;
          let pst_h3 = pst_a.appendChild(document.createElement("h4"));
          let pst_p = pst_a.appendChild(document.createElement("p"));
          posts_list.appendChild(pst_a);
          psts_a.push(pst_a);
          psts_h.push(pst_h3);
          psts_p.push(pst_p);
        }

        for (let i = 0; i < n_posts; i++) {
          const post_key = "POST_" + i.toString()
          web3Client.smartContracts().getDatastoreEntry(
            blog_sc_address,
            post_key).then(function(post) {
              let data = post.candidate.substring(0, 50) + "...";
              // psts_a[i].href= "blog.html?i=" + i.toString();
              // psts_a[i].href= "opensite.html?url=site&page_to_load=blog.html?i=" + i.toString();
              psts_h[i].appendChild(document.createTextNode('Post ' + i.toString()))
              psts_p[i].appendChild(document.createTextNode(data));
              psts_a[i].addEventListener('click', function() {
                post_nb = i;
                console.log(post_nb);
              }, false);
              // pst_divs[i].innerHTML = '<h3> Post ' + i.toString() + '</h3>' + marked.parse(data);
          });
        }
      }

    });
}

function setPostNb(i) {
  window.localStorage.setItem('postNb', i.toString());
}

preview()

setInterval(readpost, 1000);
readpost()