import { useState, useEffect } from "react";
import { Args, IClient, ClientFactory, bytesToStr } from "@massalabs/massa-web3";
import { IAccount, providers } from "@massalabs/wallet-provider";

const MAX_GAS = BigInt(4294967295);

const NFT_CONTRACT_ADDRESS = "AS121m1AFwT6S1V5L9ZJLxkSm6QbaEo6MPx62WbPJb8doWpmLLuP1";

export default function AutonomousPriceInteraction() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [client, setClient] = useState<IClient | null>(null);
    const [account, setAccount] = useState<IAccount | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGlobal, setLoadingGlobal] = useState(true);

    useEffect(() => {
        async function registerAndSetProvider() {
            try {
                const allProviders = await providers(true, 10000);

                if (!allProviders || allProviders.length === 0) {
                  throw new Error("No providers available");
                }

                const massastationProvider = allProviders.find(provider => provider.name() === 'MASSASTATION');
                
                if (!massastationProvider) {
                    setErrorMessage("MASSASTATION provider not found");
                    return;
                }

                const accounts = await massastationProvider.accounts();
                if (accounts.length === 0) {
                    setErrorMessage("No accounts found");
                    return;
                }

                setAccount(accounts[0]);
                if (!account || !massastationProvider) {
                    return;
                }
                setClient(await ClientFactory.fromWalletProvider(massastationProvider, account));
            } catch (e) {
                setErrorMessage("Please install Massa Station and the wallet plugin of Massa Labs and refresh.");
            } finally {
                setLoadingGlobal(false);
            }
        }

        registerAndSetProvider();
    }, [account]);

    const fetchOwner = async () => {
        try {

            if (!account || !client) return;
    
            const tokenId = window.prompt("Please enter the tokenId:");
        
            if (!tokenId) {
                setErrorMessage("Address input was canceled or empty.");
                return;
            }

            const res = await client.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_ownerOf",
                parameter: new Args().addU256(BigInt(tokenId)).serialize(),
            });

            const retrievedOwner = bytesToStr(res.returnValue);
            alert(`Owner of Token ID: ${tokenId} is ${retrievedOwner}`);
        } catch (error) {
            setErrorMessage("Failed to fetch owner.");
            console.error(error);
            alert(error);
        }
    };

    const fetchApproved = async () => {
        try {

            if (!account || !client) return;
    
            const tokenId = window.prompt("Please enter the tokenId:");
        
            if (!tokenId) {
                setErrorMessage("Address input was canceled or empty.");
                return;
            }

            const res = await client.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_getApproved",
                parameter: new Args().addU256(BigInt(tokenId)).serialize(),
            });

            const retrievedApproval = bytesToStr(res.returnValue);
            alert(`Token ID: ${tokenId} is approved to ${retrievedApproval}`);
        } catch (error) {
            setErrorMessage("Failed to fetch approvals");
            console.error(error);
            alert(error);
        }
    };

    const mintToken = async () => {
        setLoading(true);
        try {
            if (!account || !client) return;
    
            const userAddress = window.prompt("Please enter the address:");
        
            if (!userAddress) {
                setErrorMessage("Address input was canceled or empty.");
                return;
            }
    
            await client.smartContracts().callSmartContract({
                targetAddress: NFT_CONTRACT_ADDRESS,
                functionName: "nft1_mint",
                parameter: new Args().addString(userAddress).serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(1),
                fee: BigInt(0),
            });
    
        } catch (error) {
            setErrorMessage("Failed to mint.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const approve = async () => {
        setLoading(true);
        try {
            if (!account || !client) return;
            
            const tokenID = window.prompt("Please enter the tokenID you want to approve:");
            const spenderAddress = window.prompt("Please enter the spender address:");
        
            if (!spenderAddress || !tokenID) {
                setErrorMessage("Address/tokenID input was canceled or empty.");
                return;
            }
    
            await client.smartContracts().callSmartContract({
                targetAddress: NFT_CONTRACT_ADDRESS,
                functionName: "nft1_approve",
                parameter: new Args().addU256(BigInt(parseInt(tokenID))).addString(spenderAddress).serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(1),
                fee: BigInt(0),
            });
    
        } catch (error) {
            setErrorMessage("Failed to approve.");
            console.error(error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };
    

    const fetchTokenURI = async () => {
        try {
            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_baseURI",
                parameter: new Args().serialize(),
            });

            const retrievedTokenURI = bytesToStr(res.returnValue);
            alert(`Token URI: ${retrievedTokenURI}`);
        } catch (error) {
            setErrorMessage("Failed to fetch token URI.");
            console.error(error);
        }
    };

    const transferFrom = async () => {
        setLoading(true);
        try {
            if (!account || !client) return;

            const fromAddress = window.prompt("Please enter the owner address:");
            const toAddress = window.prompt("Please enter the recipient address:");
            const tokenID = window.prompt("Please enter the tokenID you want to transfer:");

        
            if (!fromAddress || !tokenID || !toAddress) {
                setErrorMessage("Address/tokenID input was canceled or empty.");
                return;
            }
    
            await client.smartContracts().callSmartContract({
                targetAddress: NFT_CONTRACT_ADDRESS,
                functionName: "nft1_transferFrom",
                parameter: new Args().addString(fromAddress).addString(toAddress).addU256(BigInt(parseInt(tokenID))).serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(1),
                fee: BigInt(0),
            });
    
        } catch (error) {
            setErrorMessage("Failed to transfer.");
            console.error(error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="centered-content">
            <div className="title">Massa NFT Interaction</div>
            <div className="mas-body">
                <div className="py-4">
                    <button onClick={fetchOwner}>
                        Verify Ownership
                    </button>
                </div>
                <div className="py-4">
                    <button onClick={fetchTokenURI}>
                        Verify Token URI
                    </button>
                </div>
                <div className="py-4">
                    <button onClick={mintToken} disabled={loading}>
                         {loading ? <div className="spinner"></div> : "Mint Token"}
                    </button>
                </div>
                <div className="py-4">
                    <button onClick={approve} disabled={loading}>
                         {loading ? <div className="spinner"></div> : "Approve Token"}
                    </button>
                </div>
                <div className="py-4">
                    <button onClick={fetchApproved} disabled={loading}>
                         {loading ? <div className="spinner"></div> : "Verify Approval"}
                    </button>
                </div>
                <div className="py-4">
                    <button onClick={transferFrom} disabled={loading}>
                         {loading ? <div className="spinner"></div> : "Transfer token"}
                    </button>
                </div>
            </div>
        </div>
    );
}