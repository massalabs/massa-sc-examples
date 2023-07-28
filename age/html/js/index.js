let massa = window.massa;
let wallet = window.wallet;

let client = null;
let account = null;
let ageResult = null;
let Args = massa.Args;

let name = "Alice";

const CONTRACT_ADDRESS =
  "AS1284LtJxDNyYTMLioPtbnsF3h3xAXMFnDF1kBrKBjN4WDSdbzsw";

/* Functions */
function setName() {
  let newName = document.getElementById("nameInput").value;
  let names = document.getElementsByClassName("name");
  for (let i = 0; i < names.length; i++) {
    names[i].innerText = newName;
  }
  name = newName;
}

const initializeClient = async () => {
  try {
    let provider = (await wallet.providers(true, 10000))[0];
    let accounts = await provider.accounts();
    if (accounts.length === 0) {
      throw new Error("No accounts found");
    }
    account = accounts[0];
    if (!account || !provider) {
      throw new Error("No account or provider found");
    }
    client = await massa.ClientFactory.fromWalletProvider(provider, account);
  } catch (e) {
    console.error(e);

  }
};

async function getAge() {
  try {
    if (!account || !client) {
      throw new Error("No account or client found");
    }
    let res = await client.smartContracts().readSmartContract({
      maxGas: BigInt(1000000),
      targetAddress: CONTRACT_ADDRESS,
      targetFunction: "getAge",
      parameter: new Args().addString(name).serialize(),
    });
    ageResult = massa.bytesToU32(res.returnValue);
    document.getElementById("ageResult").innerText = ageResult;
    console.log("ageResult: " + ageResult);
  } catch (error) {
    console.error(error);
  }
}

async function setAge() {
  try {
    if (!account || !client) {
      console.log("no account or client");
      return;
    }

    let number = document.getElementById("ageInput").value;
    let args = new Args();
    args.addString(name);
    args.addU32(number);
    if (client) {
      await client
        .smartContracts()
        .callSmartContract({
          targetAddress: CONTRACT_ADDRESS,
          functionName: "changeAge",
          parameter: args.serialize(),
          maxGas: BigInt(1000000),
          coins: BigInt(0),
          fee: BigInt(0),
        })
        .then((res) => {
          console.log("OpId: ", res);
        });
    }
  } catch (error) {
    console.error(error);
  }
}

/* Main */
initializeClient();
