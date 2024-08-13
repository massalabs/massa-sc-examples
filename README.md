# Massa Smart Contract Development

This repository provides information and resources for developing smart contracts on the Massa blockchain using the latest tooling.

> **Important Version Information**
>
> This project uses the next version of Massa development tools, which includes significant improvements and new features. If you need to reference older versions or examples, please check the `legacy` folder in this repository.

## Current Tooling

The Massa blockchain ecosystem now uses the following tools for smart contract development:

- [Massa Smart Contract Toolkit](https://github.com/massalabs/massa-sc-toolkit): A comprehensive toolkit for developing, testing, and deploying smart contracts on Massa.
- [Massa Web3](https://github.com/massalabs/massa-web3/tree/next): A JavaScript library for interacting with the Massa blockchain.
- [Massa wallet-provider](https://github.com/massalabs/wallet-provider/tree/next): A Web3 provider for connecting to the Massa wallet.

## Hello World Project

This repository includes a Hello World project to help you get started with Massa smart contract development. Here's what you need to know:

1. **Smart Contract Setup**:

   - Navigate to the `smart-contract` folder.
   - Create a `.env` file in this folder.
   - Add a private key that owns some coins to the `.env` file.
   - **Important**: Be careful not to push the `.env` file to version control.

2. **Testing**:

   - Run tests using the command: `npm run test`

3. **Deployment**:
   - Check the deploy file to understand how contracts are deployed.
   - Deploy the contract using: `npm run deploy`

# Massa Smart Contract Development

## Front-end Implementations

We provide two front-end implementations for interacting with the smart contract:

1. **Vanilla JavaScript Version**:

   - Located in the `vanilla-js` folder.
   - Setup: Run `npm install`
   - Start the development server: `npm run dev`

2. **React Version**:
   - Located in the `react` folder.
   - Setup: Run `npm install`
   - Start the development server: `npm run dev`

Both versions demonstrate the same functionality but use different technologies.

### Vite Configuration and Polyfills

To ensure compatibility with Vite and to provide necessary polyfills, we have done the following:

1. Install required dependencies:

   ```
   npm install lodash-es
   npm install vite-plugin-node-polyfills
   ```

2. Create a `vite.config.js` file in your project root with the following content:

   ```javascript
   import { defineConfig } from "vite";
   import { nodePolyfills } from "vite-plugin-node-polyfills";

   export default defineConfig({
     plugins: [nodePolyfills()],
     resolve: {
       alias: {
         lodash: "lodash-es",
       },
     },
     build: {
       rollupOptions: {
         external: ["lodash"],
       },
     },
   });
   ```

   This configuration adds the necessary Node.js polyfills and resolves lodash to its ES module version.

   **Use it in your own Vite projects to ensure compatibility with the Massa Web3 library.**

## Resources

- [Massa Documentation](https://docs.massa.net/)
- [Massa Smart Contract Development Guide](https://docs.massa.net/docs/build/smart-contract/intro)
- [Massa Web3 API Reference (legacy version)](https://web3.docs.massa.net/)
- [Massa official website](https://massa.net/)

## Legacy Projects

For reference to older projects and examples, please check the `legacy` folder in this repository. Note that these projects may use outdated tools or approaches and are kept for historical purposes only.

## Contributing

We welcome contributions to improve smart contract development resources for Massa. Please see the [CONTRIBUTING file](CONTRIBUTING.md) for more information on how to contribute.

## License

This repository is licensed under the [MIT License](LICENSE).
