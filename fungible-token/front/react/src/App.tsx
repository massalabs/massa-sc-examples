import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { getWallets, WalletName } from "@massalabs/wallet-provider";
import { MRC20, OperationStatus, Provider } from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = "AS1Pm9Cbh8zM6HjfGMADKNxWshQm9cHrkbKrDBRNPdbCcvuWGGWx";

function App() {
  const [provider, setProvider] = useState<Provider>();
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState(0n);
  const [userBalance, setUserBalance] = useState(0n);
  const [userAddress, setUserAddress] = useState("");
  const [mrc20, setMrc20] = useState<MRC20>();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferStatus, setTransferStatus] = useState("");

  useEffect(() => {
    if (provider) {
      setMrc20(new MRC20(provider, CONTRACT_ADDRESS));
    }
  }, [provider]);

  const fetchTokenInfo = useCallback(async () => {
    if (!mrc20) {
      console.log("MRC20 instance not initialized");
      return;
    }

    try {
      setTokenName(await mrc20.name());
      setTokenSymbol(await mrc20.symbol());
      setTotalSupply(await mrc20.totalSupply());
      setUserBalance(await mrc20.balanceOf(userAddress));
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  }, [mrc20, userAddress]);

  useEffect(() => {
    const initProvider = async () => {
      const walletList = await getWallets();
      const wallet = walletList.find(
        (provider) => provider.name() === WalletName.Bearby
      );
      if (!wallet) {
        console.log("No wallet found");
        return;
      }

      const accounts = await wallet?.accounts();

      if (accounts.length === 0) {
        console.log("No accounts found");
        return;
      }

      const provider = accounts[0];
      setProvider(provider);
      setUserAddress(await provider.address);
    };
    initProvider();
  }, []);

  useEffect(() => {
    if (mrc20) {
      fetchTokenInfo();
    }
  }, [fetchTokenInfo, mrc20]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mrc20) {
      setTransferStatus("MRC20 instance not initialized");
      return;
    }

    try {
      const amount = BigInt(transferAmount);
      const operation = await mrc20.transfer(recipientAddress, amount);

      setTransferStatus(`Transfer initiated. Operation ID: ${operation.id}`);

      const status = await operation.waitSpeculativeExecution();

      operation.getSpeculativeEvents().then((events) => {
        console.log("Speculative events:", events);
      });

      if (status === OperationStatus.SpeculativeSuccess) {
        setTransferStatus("Transfer successful!");
        fetchTokenInfo(); // Refresh token info after transfer
      } else {
        setTransferStatus("Transfer failed");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setTransferStatus(`Transfer failed: ${error}`);
    }
  };

  if (!provider) {
    return <div className="app-container">Loading Provider...</div>;
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="card-title">Token Info DApp</h1>
        <p className="card-sub-title">
          Deploy your own token with your address to have a positive balance.
        </p>
        <div className="token-info">
          <p>
            <strong>Token Name:</strong> {tokenName}
          </p>
          <p>
            <strong>Token Symbol:</strong> {tokenSymbol}
          </p>
          <p>
            <strong>Total Supply:</strong> {totalSupply.toString()}
          </p>
          <p>
            <strong>Your Address:</strong> {userAddress}
          </p>
          <p>
            <strong>Your Balance:</strong> {userBalance.toString()}
          </p>
        </div>
        <button className="button" onClick={fetchTokenInfo}>
          Refresh Token Info
        </button>

        <h2>Transfer Tokens</h2>
        <form onSubmit={handleTransfer}>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Recipient Address"
            className="input"
          />
          <input
            type="text"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Amount"
            className="input"
          />
          <button type="submit" className="button">
            Transfer
          </button>
        </form>
        {transferStatus && <p className="transfer-status">{transferStatus}</p>}
      </div>
    </div>
  );
}

export default App;
