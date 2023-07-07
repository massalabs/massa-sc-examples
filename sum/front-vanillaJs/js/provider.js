// const secretKey = "S12WS2o2oySdwMKQ2czTRSwpgb459ovvS46J3novu8jskA1js574"; testnet
const secretKey = "S12oX9CZMSfFwB6rb1BjgDYNQXxvtyX4AZi6mFsuhK2azLCCNHBH";

const { toMAS, WalletClient, ClientFactory, DefaultProviderUrls } = massa;

export default class Provider {
  constructor(wallet) {
    this.wallet = wallet;
    this.num1 = 0;
    this.num2 = 0;
  }

  async connect(provider) {
    const baseAccount = await WalletClient.getAccountFromSecretKey(secretKey);

    this.client = await ClientFactory.createDefaultClient(
      "https://buildnet.massa.net/api/v2:33035",
      true,
      baseAccount
    );

    const balance = await this.client
      .wallet()
      .getAccountBalance(baseAccount.address);

    this.wallet.address = baseAccount.address;
    this.wallet.balance = toMAS(balance.final);
  }
}
