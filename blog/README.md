# Massa Blog

This is a simple smart contract project that demonstrates how to use the massa smart-contract toolkit to test, compile and deploy a smart contract to the Massa blockchain.

This smart contract is a blog functioning on the Massa Blockchain. It allows users to create, and delete blog posts, all of which are stored directly on the blockchain as transactions.

## Installation
To use this project, you'll need to have Node.js and NPM installed on your system. You can download Node.js from the official website [here](https://nodejs.org/en/download).

Once you have Node.js and NPM installed, you can clone the project from GitHub using the following command:

```bash
git clone git@github.com:massalabs/massa-sc-examples.git
```

After cloning the project, navigate to the project directory and install the required dependencies using NPM:

```bash
cd massa-sc-examples/blog
npm install
```

This will install the required packages specified in the package.json file, including massa-sc-compiler, massa-sc-deployer, massa-as-sdk.

## Usage

### Testing
To run the unit tests for the project, use the following command:

```shell
npm run test
```

This will run the [AssemblyScript test file](/assembly/__tests__/massa-example.spec.ts) using as-pect.

### Building
To compile the AssemblyScript smart contracts in the assembly/contracts directory, use the following command:

```shell
npm run build
```

The wasm file will be generated in the build directory.

### Deploying
Before deploying the smart contracts, you need to update the .env file at the root of the repository with the following keys set to valid values:

- WALLET_PRIVATE_KEY: Your wallet private key
- JSON_RPC_URL_PUBLIC: The URL of the JSON-RPC endpoint for the Massa blockchain.

Once you have set these values, you can deploy the smart contracts using the following command:

```shell
npm run deploy
```

## Contributing
This project was generated using the sc-project-initializer tool provided by Massa, following the instructions in the Massa documentation [here](https://docs.massa.net/en/latest/web3-dev/smart-contracts/getting-started.html#setting-up-a-new-project).


To modify the project, the following files need to be updated:

- README.md: Updated with project-specific information and usage instructions.
- assembly/contracts/main.ts: Updated with smart contract code.
- assembly/__test__/massa-example.spec.ts: Updated with a simple test case.

If you wish to contribute to this project, please follow these guidelines:

1. Fork the repository and create a new branch for your changes.
2. Make your changes to the appropriate files.
3. Test your changes thoroughly.
4. Commit your changes with a clear and descriptive commit message.
5. Push your changes to your forked repository.
6. Open a pull request against the original repository.

Thank you for your contributions!
