# Tic-tac-toe smart-contract

You'll find in this repository the tic-tac-toe smart contracts.

## Smart contracts

- [contracts/assembly/contract/tictactoe](https://github.com/massalabs/massa-sc-examples/tree/main/games/tictactoe/contracts/assembly/contracts/tictactoe.ts)
  contains the tic-tac-toe logic ("game engine").
- [contracts/assembly/contract/main](https://github.com/massalabs/massa-sc-examples/tree/main/games/tictactoe/contracts/assembly/contracts/main.ts)
  is used to deploy the tic-tac-toe smart contract for each game.

## Build:

The following command will build your contract. It assumes your contract entrypoint is `assembly/main.ts`

```shell
npm run build
```