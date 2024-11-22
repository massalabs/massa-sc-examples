# Execute Airdrop
---
## Overview

`Execute airdrop` is an example designed to demonstrate the use of `executeSc` for executing smart contracts directly on-chain without deployment. This repository showcases an **Airdrop** smart contract, which distributes MRC20 tokens to a predefined list of addresses in a single atomic operation.

The **Airdrop** smart contract leverages `executeSc` to ensure that the operation is atomic — if any transaction fails, all transactions in the airdrop revert, preventing partial token distribution.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- Massa Account
- MRC20 Token Contract (Deployed) Check fungible token example for more details.


## Installation

1. Install dependencies:
   ```bash
   npm install
    ```

2. Configure environment variables by creating a `.env` file:
    ```plaintext
    PRIVATE_KEY=your_private_key
    ```

3. Update the `addressList` in `addressList.ts` with the recipient addresses for the airdrop.
4. Update MRC20 contract address in `assembly/contracts/mrc20-address.ts` contract.
5. Update token amount in `airdrop.ts` contract.
6. Update token information in `airdrop.ts` contract.


## Scripts

Build the smart contracts:
```bash
npm run build
```

Execute the Airdrop smart contract:
```bash
npm run airdrop
```

## Smart Contracts

### Airdrop Contract
- Distributes an `amount`of Tokens tokens to each address in the predefined `addressList`.
- Key Features:
  - Validates that the airdrop has not been executed previously (version control).
  - Ensures the number of recipients does not exceed block limits.
- **Important**:
  - **Version Tracking**: Update the `VERSION` constant in the `airdrop.ts` contract file before executing a new airdrop.
  - **MRC20 Contract Address**: Replace the placeholder MRC20 address in the `assembly/contracts/mrc20-address.ts` file with the actual deployed MRC20 address.


## Usage

### Executing the Airdrop
1. Ensure the MRC20 tokens are minted and available in your wallet.
2. **Update `airdrop.ts`**:
   - Set the correct `VERSION` value if running the airdrop for the first time or after modifications.
   - Replace the placeholder MRC20 contract address with the actual one.
3. Run the Airdrop contract:
   `npm run airdrop`

4. Check the balances of recipient addresses in `addressList` to verify successful distribution.


## Address List

The recipient addresses for the airdrop are defined in `addressList.ts`. Update this list with your desired addresses before execution. Limited to 850 addresses per airdrop due to block limits.

```typescript
export const addressList = [
  'AU1jCffxJFjMQRg1WkoT1gDiFvZGg1WuogiwBWQFZ2LJwEyHPRPZ',
  'AU1rFqhTWvRyuJT3UH5ZZSBjALcAsjXCPPcgUkWaBghYsYicTrB5',
  // Add more addresses as needed
];
```


## Notes

- **Atomic Execution**: Leveraging `executeSc` ensures that either all transactions succeed, or none are executed, preventing partial token distributions.
- **Version Control**: Always update the `VERSION` in the Airdrop contract to prevent accidental reruns.
- **MRC20 Contract Address**: Ensure the MRC20 contract address is updated in `assembly/contracts/mrc20-address` before executing the airdrop.
