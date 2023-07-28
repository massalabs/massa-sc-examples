let massa = window.massa;
let wallet = window.wallet;

let client = null;
let account = null;
let ageResult = null;
let Args = massa.Args;

const CONTRACT_ADDRESS =
  "AS1284LtJxDNyYTMLioPtbnsF3h3xAXMFnDF1kBrKBjN4WDSdbzsw";

/* Functions */
const initializeClient = async () => {
  try {
    let provider = (await wallet.providers(true, 10000))[0];
    let accounts = await provider.accounts();
    if (accounts.length === 0) {
      console.log("no accounts found");
      return;
    }
    account = accounts[0];
    if (!account || !provider) {
      return;
    }
    client = await massa.ClientFactory.fromWalletProvider(provider, account);
  } catch (e) {
    console.log(e);
  }
};

async function getAge() {
  try {
    console.log("calling getAge");
    if (!account || !client) {
      console.log("no account or client");
      await initializeClient();
      return;
    }
    console.log("calling getAge");
    let res = await client.smartContracts().readSmartContract({
      maxGas: BigInt(1000000),
      targetAddress: CONTRACT_ADDRESS,
      targetFunction: "getAge",
      parameter: new Args().addString("alice").serialize(),
    });
    ageResult = massa.bytesToU32(res.returnValue);
    console.log("ageResult: " + ageResult);
  } catch (error) {
    console.error(error);
  }
}

function funcSetAge(number) {
  let args = new Args();
  args.addString("alice");
  args.addU32(
    BigInt(document.getElementById("age").innerHTML) + BigInt(number)
  );
  if (client) {
    client
      .smartContracts()
      .callSmartContract({
        fee: 0,
        maxGas: 1000000,
        coins: 0,
        targetAddress: sc_addr,
        functionName: "change_age",
        parameter: args.serialize(),
      })
      .then((res) => {
        console.log(res);
      });
  }
}
