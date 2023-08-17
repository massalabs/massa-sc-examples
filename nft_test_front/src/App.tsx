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

    function stringToBoolean(value: string): boolean {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        throw new Error("Invalid boolean string");
    }

    const approveForAll = async () => {
        setLoading(true);
        try {
            if (!account || !client) return;
            
            const operatorAddress = window.prompt("Please enter the operator's address:");
            const approved = window.prompt("Please enter true or false to approve or disapprove all tokens:");
        
            if (!operatorAddress || !approved) {
                setErrorMessage("Address/Bool input was canceled or empty.");
                return;
            }
    
            await client.smartContracts().callSmartContract({
                targetAddress: NFT_CONTRACT_ADDRESS,
                functionName: "nft1_setApprovalForAll",
                parameter: new Args().addString(operatorAddress).addBool(stringToBoolean(approved)).serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(1),
                fee: BigInt(0),
            });
    
        } catch (error) {
            setErrorMessage("Failed to approve for all.");
            console.error(error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };
    

    const fetchBaseURI = async () => {
        try {
            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_baseURI",
                parameter: new Args().serialize(),
            });

            const retrievedBaseURI = bytesToStr(res.returnValue);
            alert(`Base URI: ${retrievedBaseURI}`);
        } catch (error) {
            setErrorMessage("Failed to fetch base URI.");
            console.error(error);
            alert(error);
        }
    };

    const fetchTokenURI = async () => {
        try {

            const tokenID = window.prompt("Please enter the tokenID to check his URI:");

        
            if (!tokenID) {
                setErrorMessage("tokenID input was canceled or empty.");
                return;
            }

            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_tokenURI",
                parameter: new Args().addU256(BigInt(parseInt(tokenID))).serialize(),
            });

            const retrievedTokenURI = bytesToStr(res.returnValue);
            alert(`Token URI: ${retrievedTokenURI}`);
        } catch (error) {
            setErrorMessage("Failed to fetch token URI.");
            console.error(error);
            alert(error);
        }
    };

    const setURI = async () => {
        setLoading(true);
        try {
            if (!account || !client) return;

            const BaseURI = window.prompt("Please enter the new Base URI:");

            if (!BaseURI) {
                setErrorMessage("BaseURI input was canceled or empty.");
                return;
            }
    
            await client.smartContracts().callSmartContract({
                targetAddress: NFT_CONTRACT_ADDRESS,
                functionName: "nft1_setURI",
                parameter: new Args().addString(BaseURI).serialize(),
                maxGas: MAX_GAS,
                coins: BigInt(1),
                fee: BigInt(0),
            });
    
        } catch (error) {
            setErrorMessage("Failed to set new base URI.");
            console.error(error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    const currentSupply = async () => {
        try {
            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_currentSupply",
                parameter: new Args().serialize(),
            });

            const retrievedCurrentSupply = new Args(res.returnValue).nextI64();
            alert(`Current Supply: ${retrievedCurrentSupply}`);
        } catch (error) {
            setErrorMessage("Failed to fetch current supply.");
            console.error(error);
            alert(error);
        }
    };

    const totalSupply = async () => {
        try {
            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_totalSupply",
                parameter: new Args().serialize(),
            });

            const retrievedTotalSupply = new Args(res.returnValue).nextI64();
            alert(`Total Supply: ${retrievedTotalSupply}`);
        } catch (error) {
            setErrorMessage("Failed to fetch total supply.");
            console.error(error);
            alert(error);
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

    const isApprovedForAll = async () => {
        try {
            const ownerAddress = window.prompt("Please enter the owner's address:");
            const operatorAddress = window.prompt("Please enter the operator's address:");

            if (!ownerAddress || !operatorAddress) {
                setErrorMessage("Address input was canceled or empty.");
                return;
            }

            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_isApprovedForAll",
                parameter: new Args().addString(ownerAddress).addString(operatorAddress).serialize(),
            });

            const retrievedApprovals = bytesToStr(res.returnValue);
            alert(`Is approved for all: ${retrievedApprovals}`);
        } catch (error) {
            setErrorMessage("Failed to determine approval.");
            console.error(error);
            alert(error);
        }
    };

    const fetchName = async () => {
        try {
            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_name",
                parameter: new Args().serialize(),
            });

            const retrievedName = bytesToStr(res.returnValue);
            alert(`Token Name: ${retrievedName}`);
        } catch (error) {
            setErrorMessage("Failed to fetch token name.");
            console.error(error);
            alert(error);
        }
    };

    const fetchSymbol = async () => {
        try {
            const res = await client!.smartContracts().readSmartContract({
                maxGas: MAX_GAS,
                targetAddress: NFT_CONTRACT_ADDRESS,
                targetFunction: "nft1_symbol",
                parameter: new Args().serialize(),
            });

            const retrievedSymbol = bytesToStr(res.returnValue);
            alert(`Token Symbol: ${retrievedSymbol}`);
        } catch (error) {
            setErrorMessage("Failed to fetch symbol.");
            console.error(error);
            alert(error);
        }
    };

    
    return (
        <div className="centered-content">
            <div className="title">Massa NFT Interaction</div>
            <div className="mas-body">
                <div className="button-columns">
                    <div className="column">
                        <div className="py-4">
                            <button onClick={fetchOwner}>Verify Ownership</button>
                        </div>
                        <div className="py-4">
                            <button onClick={fetchBaseURI}>Verify Base URI</button>
                        </div>
                        <div className="py-4">
                            <button onClick={fetchTokenURI}>Verify Token URI</button>
                        </div>
                        <div className="py-4">
                            <button onClick={setURI} disabled={loading}>
                                {loading ? <div className="spinner"></div> : "Set New Base URI"}
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
                            <button onClick={isApprovedForAll}>Verify Approved For All</button>
                        </div>
                    </div>
                    <div className="column">
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
                        <div className="py-4">
                            <button onClick={currentSupply}>Verify Current Supply</button>
                        </div>
                        <div className="py-4">
                            <button onClick={totalSupply}>Verify Total Supply</button>
                        </div>
                        <div className="py-4">
                            <button onClick={approveForAll} disabled={loading}>
                                {loading ? <div className="spinner"></div> : "Approve for all"}
                            </button>
                        </div>
                        <div className="py-4">
                            <button onClick={fetchName}>Verify Name</button>
                        </div>
                        <div className="py-4">
                            <button onClick={fetchSymbol}>Verify Symbol</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}