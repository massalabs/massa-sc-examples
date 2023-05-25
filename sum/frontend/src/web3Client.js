import { Client, ProviderType } from "@massalabs/massa-web3";
import axios from "axios";
import secrets from "./secrets.json";
import Args from "@massalabs/massa-web3/dist/utils/arguments";

const MAX_LOOP = 50;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export class Web3Client extends Client {
  contractAddress;

  constructor() {
    const baseAccount = {
      address: secrets.DEFAULT_WALLET_ADDRESS,
      secretKey: secrets.DEFAULT_WALLET_PRIVATE_KEY,
      publicKey: secrets.DEFAULT_WALLET_PUBLIC_KEY,
    };

    const providers = [
      {
        url: secrets.JSON_RPC_URL_PUBLIC,
        type: ProviderType.PUBLIC,
      },
      {
        url: secrets.DEFAULT_WALLET_PRIVATE_KEY,
        type: ProviderType.PRIVATE,
      },
    ];

    const web3ClientConfig = {
      providers: providers,
      retryStrategyOn: true,
      periodOffset: 1,
    };

    super(web3ClientConfig, baseAccount);

    this.contractAddress = secrets.DEFAULT_WALLET_ADDRESS;
  }

  submit(integerA, integerB) {
    const args = new Args().addU32(integerA).addU32(integerB).serialize();

    const options = {
      method: "POST",
      url: "https://my.massa/cmd/executeFunction",
      headers: { "Content-Type": "application/json" },
      data: {
        nickname: "wallet",
        name: "sum",
        at: "A1259s3fdg8ACtT9oKWBSt8PFqABWsq6fGp3c9mZrskbCUFENBnC",
        args,
        gaz: { price: 1000, limit: 700000000 },
        coins: 0,
        expiry: 3,
        fee: 0,
        keyId: "default",
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async listenEvent(operationId) {
    let loopCounter = 0;
    let event;
    while (loopCounter < MAX_LOOP) {
      try {
        event = await this.smartContracts().getFilteredScOutputEvents({
          emitter_address: null,
          start: null,
          end: null,
          original_caller_address: null,
          original_operation_id: operationId,
          is_final: null,
        });
      } catch (error) {
        console.error(error);
        continue;
      }

      if (event[0]) {
        return event[0];
      }

      loopCounter++;
      await delay(5000);
    }
    return "";
  }
}
