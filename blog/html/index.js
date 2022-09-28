const baseAccount = {
  publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
  secretKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
  address: "A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
};

const blog_sc_address = "A17bNPYtupgBMtCs4odeEmyqaddkbLFpNhAmo1MBmEAHMRCbfju";

function publish() {
  const txt = document.getElementById("publish-post").value;
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
      }
    );
  })
}

post_nb = null;
function preview() {
  const post_key = "N_BLOG_POSTS"
  window.massa.ClientFactory.createDefaultClient(
    "https://test.massa.net/api/v2",
    false,
    baseAccount
  ).then((web3Client) => {
    web3Client.publicApi().getDatastoreEntries([{address: blog_sc_address, key: post_key}]).then(
      function(n_posts_str) {
        let n_posts = parseInt(n_posts_str[0].candidate);
        let posts_list = document.getElementById("post");
        posts_list.innerHTML = "";
      
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
            web3Client.publicApi().getDatastoreEntries([{address: blog_sc_address, key: post_key}]).then(
              function(post) {
                let data = post[0].candidate.substring(0, 50) + "...";
                psts_a[i].href= "blog.html?i=" + i.toString();
                psts_h[i].appendChild(document.createTextNode('Post ' + i.toString()))
                psts_p[i].appendChild(document.createTextNode(data));
                psts_a[i].addEventListener('click', function() {
                  post_nb = i;
                }, false);
            });
          }
        }
      });
    }
  )
}

preview()
