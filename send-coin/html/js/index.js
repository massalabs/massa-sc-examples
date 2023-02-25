const baseAccount = {
  address: "A12NSDKGBRyddRhraQGHCgY7XCxUpYjsnkKGqvDoUJHATREcBpco",
  secretKey: "S1waNKtVExLZZFmFdoYmAaxzFWrTU17GmYMPKejsDiXzA5hfx3Z",
  publicKey: "P12KZymkagdS1bZbREw2D4dzdNYQK7ENcPg2Q8tYM6AbKPMRAJ2J",
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

let sc_addr = "A1BnRULBZGEKDHNkb3S5Cbx7JX5D7AsKgzmep2bRD1Jt48531Tf";

function initialize() {
  const massaArgs = new massa.Args();
  const inputAddress = document.getElementById("addr").value;
  massaArgs.addString(inputAddress);

  if (client) {
    client
      .smartContracts()
      .callSmartContract(
        {
          fee: 0,
          maxGas: 200000,
          targetAddress: sc_addr,
          targetFunction: "sendCoin",
          parameter: massaArgs.serialize(), // this is based on input arguments
        },
        baseAccount
      )
      .then((res) => {
        console.log(res);
      });
  }
}
