const dim = 100;

const baseAccount = {
    publicKey: "zkTGqfwJp43tY4FPgRXC7fr2xML3kDQ8bch15SpnDehuxWiKS",
    privateKey: "25CHWGN5DZemFnEdPyYfDkyYzEwierr3vCuP3Z4tiChfQpBP41",
    address: "A1MrqLgWq5XXDpTBH6fzXHUg7E8M5U2fYDAF3E1xnUSzyZuKpMh"
};

const sc_addr = "A1MrqLgWq5XXDpTBH6fzXHUg7E8M5U2fYDAF3E1xnUSzyZuKpMh";

var candidates = [];

function set_dots(call_params) {
    let call_params_lst = [];
    for (let i = 0; i < call_params.length; ++i) {
        call_params_lst.push(String(call_params[i]["index"]) + "=" + (call_params[i]["value"] ? "1" : "0"));
    }
    let call_params_str = call_params_lst.join("/");

    function onresponse(s) {
        candidates.push({
            "txid": s[0],
            "params": call_params
        });
    }

    function onerror(s) {
        console.log(s);
    }
    let maxGas = 700000000;
    let maxGasEncoded = new Uint8Array(window.varint.encode(maxGas));

    // parallel coins to send
    let parallelCoins = 0;
    let parallelCoinsEncoded = new Uint8Array(window.varint.encode(parallelCoins));

    // parallel coins to send
    let sequentialCoins = 0;
    let sequentialCoinsEncoded = new Uint8Array(window.varint.encode(sequentialCoins));

    let gasPrice = 0;
    let gasPriceEncoded = new Uint8Array(window.varint.encode(gasPrice));

    let targetAddr = sc_addr;
    let targetAddrEncoded = window.bs58check.decode(targetAddr.slice(1)).slice(1);

    let functionName = "set_dots";
    let functionNameEncoded = new TextEncoder("utf-8").encode(functionName);
    let functionNameLengthEncoded = new Uint8Array(window.varint.encode(functionNameEncoded.length));

    let paramName = call_params_str;
    let paramNameEncoded = new TextEncoder("utf-8").encode(paramName);
    let paramNameLengthEncoded = new Uint8Array(window.varint.encode(paramNameEncoded.length));

    let fee = 0
    let feeEncoded = new Uint8Array(window.varint.encode(fee));
    let expirePeriod = Math.round((Date.now() - 1654704000000) / 16000) + 10 - 1
    let expirePeriodEncoded = new Uint8Array(window.varint.encode(expirePeriod));

    let publicKeyEncoded = window.bs58check.decode(baseAccount.publicKey);

    let typeIdEncoded = new Uint8Array(window.varint.encode(4));

    let bytesCompact = new Uint8Array([...feeEncoded, ...expirePeriodEncoded, ...publicKeyEncoded, ...typeIdEncoded, ...maxGasEncoded, ...parallelCoinsEncoded, ...sequentialCoinsEncoded, ...gasPriceEncoded, ...targetAddrEncoded, ...functionNameLengthEncoded, ...functionNameEncoded, ...paramNameLengthEncoded, ...paramNameEncoded]);

    // cast private key
    let privateKeyBase58Decoded = window.bs58check.decode(baseAccount.privateKey);

    hash = window.nobleHashes.blake3(bytesCompact);
    console.log(hash);
    window.secp.schnorr.sign(hash, privateKeyBase58Decoded).then(
        // console.log(signature)
        function (signature) {
            console.log('signature');
            console.log(signature);
            let signatureEncoded = window.bs58check.encode(signature);
            JsonRPCRequest('send_operations',
                [[
                    {
                        "content": {
                            "expire_period": expirePeriod,
                            "fee": fee.toString(), // represent an Amount in coins
                            "op": {
                                "CallSC": {
                                    "target_addr": targetAddr, // Address
                                    "target_func": functionName, // Function name
                                    "param": call_params_str, // Parameter to pass to the function
                                    "max_gas": maxGas,
                                    "sequential_coins": sequentialCoins.toString(), // Amount
                                    "parallel_coins": parallelCoins.toString(), // Amount
                                    "gas_price": gasPrice.toString(), // Amount
                                }
                            },
                            "sender_public_key": baseAccount.publicKey
                        },
                        "signature": signatureEncoded
                    }
                ]]
                , onresponse, onerror)
        }
    )
};

function refresh() {
    for (let i = 0; i < candidates.length; ++i) {
        let txid = candidates[i]["txid"];
        let params = candidates[i]["params"];
    }
    function onresponse(s) {
        let state = s[0]["candidate_sce_ledger_info"]["datastore"]["XaPM2RY4V9Pj4WfZvvb2EAPnhqAA4m1NQ6EiubQon3d5oqu4z"];
        let res = "";
        for (let vi = 0; vi < state.length; ++vi) {
            res += String.fromCharCode(state[vi]);
        }
        draw(res);
    }
    function onerror(e) {
        console.log(e);
    }
    JsonRPCRequest('get_addresses', [[sc_addr]], onresponse, onerror);
}

function draw(state) {
    let table = document.getElementById("table");
    table.innerHTML = "";
    for (let y = 0; y < dim; ++y) {
        for (let x = 0; x < dim; ++x) {
            let dot = document.createElement("div");
            if (state[y * dim + x] == "1") {
                dot.classList.add("alive");
                dot.addEventListener("click", function () {
                    //set_dot(i, false);
                    add_glider(y * dim + x);
                });
            } else {
                dot.classList.add("dead");
                dot.addEventListener("click", function () {
                    //set_dot(i, true);
                    add_glider(y * dim + x);
                });
            }
            table.appendChild(dot);
        }
    }
    table.appendChild(document.createElement("br"));
}

function add_glider(i) {
    set_dots([
        { index: i - 1 + 0 * dim, value: true },
        { index: i + 0 + 1 * dim, value: true },
        { index: i + 1 + 1 * dim, value: true },
        { index: i + 1 + 0 * dim, value: true },
        { index: i + 1 - 1 * dim, value: true },
    ])
}

setInterval(refresh, 450);
refresh();
