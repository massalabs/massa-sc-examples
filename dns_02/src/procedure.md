# Deploy a DNS with Blacklisted Names and Register Entries

This procedure outlines the steps to deploy a DNS smart contract, blacklist specific names, and register new domain entries. Please follow the steps below:

**Prerequisites:**
- Node.js and npm (Node Package Manager) installed on your system.
- Environment variables set in a `.env` file:
  - `JSON_RPC_URL_PUBLIC`: The JSON RPC URL for the public API.
  - `WALLET_PRIVATE_KEY`: The private key of the wallet account.

1. Open a terminal or command prompt and navigate to the directory containing the scripts.

2. Install the required dependencies by running the following command:

3. Deploy the DNS smart contract:
- Run the following command:
  ```
  npm run deploy
  ```
- Wait for the deployment process to complete. The DNS contract address will be copied automatically to the clipboard. Make a note of this address.

4. Open the `blacklist.ts` script file and modify the following variables:
- `websiteNames`: Update this array to include the names you want to blacklist.

5. Open the `blacklist.ts` script file and replace the `dnsScAddr` variable with the DNS contract address you copied in step 3.

6. Blacklist the specified website names:
- Run the following command:
  ```
  npm run blacklist
  ```

7. Open the `addDnsEntry.ts` script file and modify the following variables:
- `websiteName`: Set the name of the website you want to register.
- `websiteScAddr`: Set the address of the website's smart contract. It can be a dummy address or the address of an already deployed website.
- `websiteDescription`: Set the description of the website.

8. Open the `addDnsEntry.ts` script file and replace the `dnsScAddr` variable with the DNS contract address you copied in step 3.

9. Register a new domain in the DNS contract:
- Run the following command:
  ```
  npm run addDnsEntry
  ```

Congratulations! You have successfully deployed a DNS smart contract, blacklisted specific names, and registered new domain entries. Ensure to customize the variables and inputs in the scripts according to your specific requirements.

Note: If you used a dummy address for `websiteScAddr`, remember to update it with the actual address once the website is deployed.
