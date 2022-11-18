## How to use

You now have your own AssemblyScript project setup, with Massa's sdk installed.

You can now run `npm run build` to compile your AssemblyScript files.

By default it will build `assembly/main.ts`.

To use librairies as massa-as-sdk and @massalabs/as you need to import the required function, for instance :

```jsx
import { generateEvent } from "@massalabs/massa-as-sdk";
export function HelloWorld(): void {
    generateEvent(`Hello World`);
}
```

## How to …

### Include another smart contract inside a smart contract ?

You can follow the following documentation :

https://github.com/massalabs/as/tree/main/transformer

## ... use the simulator

**_The simulator_** (massa-sc-tester https://github.com/massalabs/massa-sc-tester) mimics the behavior at ledger level of the Massa Blockchain.
It can also handle smart contracts deployment & smart contract calls. It means that all storage & coin balances modification are taken into account
.
It provides :

-   A mocked ledger => `ledger.json` :

    -   contains by **_address_** : **_coin balances_** , **_bytecode contents_** and **_datastore_**
    -   can be initialized by any mock
    -   will be modified after execution

-   An execution `.json` ("execution.config.json") file :

    -   Consumed by the `massa-sc-tester.exe`
    -   List all steps to be executed by the simulator (full example at https://github.com/massalabs/massa-sc-tester/blob/main/execution_config.json to know all examples )
    -   Can read & execute `.wasm` smart contracts

-   A `trace.json` file overriden at each execution :

    -   Log smart contract events
    -   Log transaction information

    To run the steps detailed in the `execution_config.json` :

The example already set up can be run with :

-   Compiling the example smart contracts
    ```
    $ npm run build
    ```
-   Running the simulate script
    ```
    $ npm run simulate
    ```

### ... use a linter

There is no specific, well-maintained Assemblyscript linter in the ecosystem.

Since Assemblyscript is a subset of Typescript, the recommendation is to use a Typescript linter.

The reference today remains ESLint, therefore the initialization script performs:

-   the installation of the dependencies necessary for its execution;
-   a minimalist configuration of ESlint and prettier (the one used by MassaLabs for its projects).

Keep in mind that many false positives will remain undetected by ESLint such as :

-   Closures
-   Spreads

### ... deploy a smart contract

Prerequisites :

-   You must add a .env file at the root of the repository with the following keys set to valid values :
    -   WALLET_PRIVATE_KEY="wallet_private_key"
    -   JSON_RPC_URL_PUBLIC=https://test.massa.net/api/v2:33035
    -   JSON_RPC_URL_PRIVATE=https://test.massa.net/api/v2:33035

These keys will be the ones used by the deployer script to interact with the blockchain.

The following command will build your contract and create the deployer associated:
It assumes your contract entrypoint is `assembly/main.ts`

```shell
npm run build
```

Then deploy your contract with:
```shell
npm run deploy
```
This command will deploy your smart contract on Massa's network corresponding to the given node.


### ... Run unit tests

Check examples in `./assembly/__test__/example.spec.ts`

Check the documentation on "https://github.com/massalabs/as/tree/main/tester"

Run the following commands :

-   To run test from all spec.ts files in your assembly folder

```shell
npm run test
```
