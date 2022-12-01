# Tic-tac-toe smart-contract

You'll find in this repository the tic-tac-toe smart contract.

## Smart contracts

- [assembly/smart-contract.ts](https://github.com/massalabs/massa-sc-examples/tree/main/games/tictactoe/smart-contract/assembly/smart-contract.ts)
  contains the tic-tac-toe logic ("game engine").
- [assembly/main.ts](https://github.com/massalabs/massa-sc-examples/tree/main/games/tictactoe/smart-contract/assembly/main.ts)
  is used to deploy the tic-tac-toe smart contract.

## How to deploy the smart contract

### Prerequisites:

-   You must add a `.env` file at the root of the repository with the following keys set to valid values:
    -   WALLET_PRIVATE_KEY="wallet_private_key"
    -   JSON_RPC_URL_PUBLIC=https://test.massa.net/api/v2:33035
    -   JSON_RPC_URL_PRIVATE=https://test.massa.net/api/v2:33035

These keys will be the ones used by the deployer script to interact with the blockchain.

Make sure you have the dependencies installed:
```shell
npm install
```

### Build:

The following command will build your contract and create the deployer associated:
It assumes your contract entrypoint is `assembly/main.ts`

```shell
npm run build
```

### Deploy:

The Tic-tac-toe smart contract can then be deployed with:
```shell
npm run deploy
```
This command will deploy your smart contract on Massa's network corresponding to the node configured in the `.env` file.
