let massa = window.massa;

// create a base account for signing transactions
const baseAccount = {
    address: 'A1qZL4iJYRDRo9EtDauJuWNj56FNXWhtKinv15GEakraBa91dEA',
    secretKey: 'S17Zw8KN3QSzsWGof7PTgkTvyGYbZLNMZmjC4urr6ZziLonThqk',
    publicKey: 'P12f2K8YoeqZCzWASs2wktFYYGtaHGYaeSukFBrgEnw9d3J1WsMZ'
};

let client = null

const sc_addr = "A12VVvTD8bdj1LDwc2uuFNKxT26AxQGv8aDgpWS9EVjekEwTZSab"

// initialize a testnet client
massa.ClientFactory.createDefaultClient(
    massa.DefaultProviderUrls.TESTNET,
    false,
    baseAccount
).then((c) => client = c);

let Args = massa.Args;

function strEncodeUTF16(str) {
    var buf = new ArrayBuffer(str.length*2);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length * 2; i < strLen; i += 2) {
      bufView[i] = str.charCodeAt(i / 2);
      bufView[i + 1] = 0;
    }
    return bufView;
}

function load() {
    if (client) {
        client.publicApi().getDatastoreEntries([{ key: strEncodeUTF16("alice"), address: sc_addr }]).then((res) => {
            if (res[0].candidate_value) {
                let age_decode = new Args(res[0].candidate_value);
                let age = age_decode.nextU32();
                document.getElementById("age").innerHTML = age;
            }
        });
    }
}

function funcSetAge(number) {
    let args = new Args();
    args.addString("alice");
    args.addU32(BigInt(document.getElementById("age").innerHTML) + BigInt(number));
    if (client) {
        client.smartContracts().callSmartContract({
            fee: 0,
            maxGas: 1000000,
            coins: 0,
            targetAddress: sc_addr,
            functionName: "change_age",
            parameter: args.serialize()
        }).then((res) => {
            console.log(res)
        });
    }
}
