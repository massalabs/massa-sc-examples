const rpc_url = "https://test.massa.net/api/v2";
const blog_sc_address = "A12GZTeri2dMRuYXSxsKUJwXfRBE68SKFRdEdT2vTu4jvstubuFf";

const baseAccount = {
  publicKey: "P139zsq8KmUGrXNgDgiHWKpCCbwxnH2pVvCPLdHkvf9PvJQGzoJ",
  secretKey: "S1tCe57zEPqdmafeMDrkFvZjqgxtHGGeezFKcfJwX8YkmjbRkVg",
  address: "A1qS7hYYYvSc61KMPWVi124k44hZAJSXKPvboYg1m2YiSDveWAp",
};


function publish() {
  const txt = document.getElementById("publish-post").value;
  window.massa.ClientFactory.createDefaultClient(
    rpc_url,
    false,
    baseAccount
  ).then((web3Client) => {
    web3Client.smartContracts().callSmartContract({
      fee: 0,
      gasPrice: 0,
      maxGas: 200000,
      coins: 100000000000,
      targetAddress: blog_sc_address,
      functionName: "post",
      parameter: txt,
  }, baseAccount).then(function(tx_id) {
        alert('Your post was successfully submitted. Operation id:\n' + tx_id);
        console.log('Your post was successfully submitted. Operation id:\n' + tx_id);
      }
    );
  })
}
