import { useState, useEffect } from "react";
import {
  Args,
  IClient,
  ClientFactory,
  bytesToStr,
  DefaultProviderUrls,
  Client,
  bytesToU256,
  bytesToU32,
} from "@massalabs/massa-web3";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider";
import {
  PublicKey,
  SecretKey,
} from "@massalabs/massa-web3/dist/esm/utils/keyAndAddresses";

const MAX_GAS = BigInt(4294967295);

const NFT_CONTRACT_ADDRESS =
  "AS1HdkdZVhX5QtGWp6BdvvxyBD3TPQrSo4djpYaCa8UHWVLBHZCp";

const getWallet = async (walletName: string) => {
  const wallets = await providers();
  const _wallet = wallets.find((wallet) => {
    if (wallet.name() === walletName) {
      return wallet;
    }
  });
  return _wallet;
};

const useNft = () => {
  const [wallet, setWallet] = useState<IProvider | null>(null);
  const [client2, setClient2] = useState<Client | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [client, setClient] = useState<IClient | null>(null);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const canCall = client && selectedAccount;

  const initAccount = async (wallet: IProvider) => {
    const accounts: IAccount[] = await wallet.accounts();
    if (!accounts.length) {
      console.log("Error: You need to create an account");
    }
    return accounts;
  };

  const initClientWallet = async (wallet: IProvider, account: IAccount) => {
    return await ClientFactory.fromWalletProvider(wallet, account);
  };

  const initClientWeb3 = async (wallet: IProvider, account: IAccount) => {
    const secret = "S1QGHQLxGXjtzvSMXz9XwatCsyRKwGMsz2WWYnBad9HRumU2HXN";
    const secretKey = new SecretKey(secret);
    const pub: PublicKey = await secretKey.getPublicKey();

    return await ClientFactory.createDefaultClient(
      DefaultProviderUrls.BUILDNET,
      false,
      {
        address: "AS1faNQLhJyhy7f2qszPXMP3E831x2nJV1J3sJDHgrcLKFKkkJSY",
        publicKey: pub.base58Encode,
        secretKey: secret,
      }
    );
  };

  const init = async (chosenWallet: string) => {
    const wallet = await getWallet(chosenWallet);
    if (!wallet) return;
    setWallet(wallet);

    const accounts: IAccount[] = await initAccount(wallet);
    if (!accounts.length) return;
    setAccounts(accounts);

    const account = accounts[0];
    setSelectedAccount(account);

    const client = await initClientWallet(wallet, account);
    setClient(client);

    const client2 = await initClientWeb3(wallet, account);
    setClient2(client2);
  };

  useEffect(() => {
    init("MASSASTATION");
  }, []);

  const changeAccount = async (account: IAccount) => {
    setSelectedAccount(account);
    const client = await initClientWallet(wallet!, account);
    setClient(client);
  };

  const withLoading =
    (fn: Function) =>
    async (...args: any[]) => {
      setLoading(true);
      try {
        return await fn(...args);
      } finally {
        setLoading(false);
      }
    };

  const readSmartContract = async (
    targetFunction: string,
    parameter: number[]
  ) => {
    if (canCall) {
      return await client.smartContracts().readSmartContract({
        targetAddress: NFT_CONTRACT_ADDRESS,
        targetFunction,
        parameter,
        maxGas: MAX_GAS,
      });
    }
  };

  const callSmartContract = async (
    functionName: string,
    parameter: number[]
  ) => {
    if (!canCall) return;
    await client.smartContracts().callSmartContract({
      targetAddress: NFT_CONTRACT_ADDRESS,
      functionName,
      parameter: parameter,
      maxGas: MAX_GAS,
      coins: BigInt(1),
      fee: BigInt(0),
    });
  };

  const promptForInput = (message: string) => {
    const input = window.prompt(message);
    if (!input) {
      setErrorMessage(`${message} was canceled or empty.`);
      throw new Error("Input canceled or empty");
    }
    return input;
  };

  // 2. Refactor the functions
  const mintToken = withLoading(async () => {
    const userAddress = promptForInput("Please enter the address:");
    await callSmartContract(
      "nft1_mint",
      new Args().addString(userAddress).serialize()
    );
  });

  const approve = withLoading(async () => {
    const tokenID = promptForInput(
      "Please enter the tokenID you want to approve:"
    );
    const spenderAddress = promptForInput("Please enter the spender address:");
    await callSmartContract(
      "nft1_approve",
      new Args()
        .addU256(BigInt(parseInt(tokenID)))
        .addString(spenderAddress)
        .serialize()
    );
  });

  function stringToBoolean(value: string): boolean {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
    throw new Error("Invalid boolean string");
  }

  const approveForAll = withLoading(async () => {
    const operatorAddress = promptForInput(
      "Please enter the operator's address:"
    );
    const approved = promptForInput(
      "Please enter true or false to approve or disapprove all tokens:"
    );
    await callSmartContract(
      "nft1_setApprovalForAll",
      new Args()
        .addString(operatorAddress)
        .addBool(stringToBoolean(approved))
        .serialize()
    );
  });

  const transferFrom = withLoading(async () => {
    const fromAddress = promptForInput("Please enter the owner address:");
    const toAddress = promptForInput("Please enter the recipient address:");
    const tokenID = promptForInput(
      "Please enter the tokenID you want to transfer:"
    );
    await callSmartContract(
      "nft1_transferFrom",
      new Args()
        .addString(fromAddress)
        .addString(toAddress)
        .addU256(BigInt(parseInt(tokenID)))
        .serialize()
    );
  });

  const isApprovedForAll = withLoading(async () => {
    const ownerAddress = promptForInput("Please enter the owner's address:");
    const operatorAddress = promptForInput(
      "Please enter the operator's address:"
    );
    const res = await readSmartContract(
      "nft1_isApprovedForAll",
      new Args().addString(ownerAddress).addString(operatorAddress).serialize()
    );
    const retrievedApprovals = bytesToU32(res?.returnValue!);
    alert(`Is approved for all: ${retrievedApprovals}`);
  });

  const fetchApproved = withLoading(async () => {
    const tokenId = promptForInput("Please enter the tokenId:");
    const res = await readSmartContract(
      "nft1_getApproved",
      new Args().addU256(BigInt(tokenId)).serialize()
    );
    const retrievedApproval = bytesToStr(res?.returnValue!);
    alert(`Token ID: ${tokenId} is approved to ${retrievedApproval}`);
  });

  const setURI = withLoading(async () => {
    const BaseURI = promptForInput("Please enter the new Base URI:");
    await callSmartContract(
      "nft1_setURI",
      new Args().addString(BaseURI).serialize()
    );
  });

  const fetchTokenURI = async () => {
    const tokenId = promptForInput("Please enter the tokenId:");

    const res = await readSmartContract(
      "nft1_tokenURI",
      new Args().addU256(BigInt(tokenId)).serialize()
    );
    const retrievedURI = bytesToStr(res?.returnValue!);
    alert(`Token ID: ${tokenId} URI: ${retrievedURI}`);
  };

  const fetchBaseURI = async () => {
    const res = await readSmartContract("nft1_baseURI", new Args().serialize());
    if (!res) return;
    const retrievedBaseURI = bytesToStr(res.returnValue);
    alert(`Base URI: ${retrievedBaseURI}`);
  };

  const fetchOwner = async () => {
    const tokenId = promptForInput("Please enter the tokenId:");

    const res = await readSmartContract(
      "nft1_ownerOf",
      new Args().addU256(BigInt(tokenId)).serialize()
    );
    const retrievedOwner = bytesToStr(res?.returnValue!);
    alert(`Token ID: ${tokenId} Owner: ${retrievedOwner}`);
  };

  const fetchCurrentSupply = async () => {
    const res = await readSmartContract(
      "nft1_currentSupply",
      new Args().serialize()
    );
    const retrievedCurrentSupply = bytesToU256(res?.returnValue!);
    alert(`Current Supply: ${retrievedCurrentSupply}`);
  };

  const fetchTotalSupply = async () => {
    const res = await readSmartContract(
      "nft1_totalSupply",
      new Args().serialize()
    );
    const retrievedTotalSupply = bytesToU256(res?.returnValue!);
    alert(`Total Supply: ${retrievedTotalSupply}`);
  };
  const fetchName = async () => {
    const res = await readSmartContract("nft1_name", new Args().serialize());
    const retrievedName = bytesToStr(res?.returnValue!);
    alert(`Name: ${retrievedName}`);
  };
  const fetchSymbol = async () => {
    const res = await readSmartContract("nft1_symbol", new Args().serialize());
    const retrievedSymbol = bytesToStr(res?.returnValue!);
    alert(`Symbol: ${retrievedSymbol}`);
  };

  // return everything
  return {
    accounts,
    selectedAccount,
    changeAccount,
    mintToken,
    approve,
    approveForAll,
    transferFrom,
    isApprovedForAll,
    fetchApproved,
    setURI,
    fetchTokenURI,
    fetchBaseURI,
    fetchOwner,
    fetchCurrentSupply,
    fetchTotalSupply,
    fetchName,
    fetchSymbol,
    loading,
    loadingGlobal,
    errorMessage,
  };
};

export default useNft;
