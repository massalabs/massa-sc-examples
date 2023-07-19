import AccountInformation from "./accountInformation";
import ContractInteraction from "./contractInteraction";
import { ProviderService } from "../interfaces/ProviderService";
import AccountCreation from "./accountCreation";
import { useEffect, useState } from "react";
import { IAccount, IProvider } from "@massalabs/wallet-provider";

export default function Body({
    connect,
    createAccount,
    connected,
    account,
    balance,
    errorMessage,
    getProviders,
    setProviderSelected,
    providerSelected,
    getAccounts,
    setAccountSelected,
    accountSelected,
    loadingProvider,
}: ProviderService) {
    const [providers, setProviders] = useState<IProvider[] | null>(null);
    const [providersName, setProvidersNames] = useState<string[]>([]);
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    useEffect(() => {
        if (getProviders !== null) {
            setProviders(getProviders);
            setProviderSelected(getProviders[0]);
            const providerNames = getProviders.map((provider) =>
                provider.name()
            );
            setProvidersNames(providerNames);
        }
    }, [getProviders]);

    useEffect(() => {
        if (getAccounts !== null) {
            setAccounts(getAccounts);
        }
    }, [getAccounts]);

    const handleChangeProvider = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedProviderName = event.target.value;
        const selectedProvider = providers?.find(
            (provider) => provider.name() === selectedProviderName
        );
        if (selectedProvider) {
            setProviderSelected(selectedProvider);
        }
    };

    const handleChangeAccount = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedAccountName = event.target.value;
        const selectedAccount = accounts?.find(
            (account) => account.name() === selectedAccountName
        );
        if (selectedAccount) {
            setAccountSelected(selectedAccount);
        }
    };

    return (
        <div className="body">
            <div className="bodyContent">
                {!connected &&
                    providersName.length > 0 &&
                    accounts.length > 0 && (
                        <>
                            <select
                                key="providerSelect"
                                className="bodyButton"
                                onChange={handleChangeProvider}
                                value={providerSelected?.name()}
                            >
                                {providers?.map((provider, index) => (
                                    <option key={`provider_${provider.name()}`}>
                                        {providersName[index]}
                                    </option>
                                ))}
                            </select>
                            <select
                                key="accountSelect"
                                className="bodyButton"
                                onChange={handleChangeAccount}
                                value={accountSelected?.name()}
                            >
                                {accounts?.map((account, index) => (
                                    <option key={`account_${account.address}`}>
                                        {accounts[index].name()}
                                    </option>
                                ))}
                            </select>
                            <button className="bodyButton" onClick={connect}>
                                Connect Wallet
                            </button>
                        </>
                    )}
                {!connected &&
                    providersName.length == 0 &&
                    accounts.length == 0 && (
                        <>
                            <div className="bodyInformationRed">
                                <p>{loadingProvider}</p>
                                {!errorMessage && (
                                    <div className="loader"></div>
                                )}
                            </div>
                        </>
                    )}
                {!connected &&
                    providersName.length != 0 &&
                    accounts.length == 0 && (
                        <>
                            <p className="bodyInformationRed">
                                {loadingProvider}
                            </p>
                            <button className="bodyButton" onClick={connect}>
                                Create Account
                            </button>
                        </>
                    )}
                {connected && !account && (
                    <AccountCreation createAccount={createAccount} />
                )}
                {connected && account && (
                    <>
                        <AccountInformation
                            accountAddress={account.address()}
                            accountName={account.name()}
                            balance={balance.finalBalance}
                        />
                        <br></br>
                        <ContractInteraction account={account} />
                    </>
                )}
            </div>
            <div className="mas-h2 text-red-500">{errorMessage}</div>
        </div>
    );
}
