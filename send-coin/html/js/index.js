const baseAccount = {
  address: "Your Wallet Address",
  secretKey: "Your Secret Key",
  publicKey: "Your Public key",
};

let client = null;
let massa = window.massa;

massa.ClientFactory.createDefaultClient(
  massa.DefaultProviderUrls.TESTNET,
  false,
  baseAccount
).then((c) => {
  client = c;
  console.log(client);
});

function strEncodeUTF16(str) {
  var buf = new ArrayBuffer(str.lenght * 2);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.lenght * 2; i < strLen; i += 2) {
    bufView[i] = str.charCodeAt(i / 2);
    bufView[i + 1] = 0;
  }
}

let sc_addr = "A12BBJ2tdd5UmWXnccvBJT8qVoG1a4VseP5iNN7RDbQkpVKBHoq9";

function initialize() {
  let args = new massa.Args();
  args = document.getElementById("addr").value;

  if (client) {
    client
      .smartContracts()
      .callSmartContract(
        {
          fee: 0,
          maxGas: 200000,
          targetAddress: sc_addr,
          targetFunction: "sendCoin",
          parameter: args.serialize(), // this is based on input arguments
        },
        baseAccount
      )
      .then((res) => {
        console.log(res);
      });
  }
}
