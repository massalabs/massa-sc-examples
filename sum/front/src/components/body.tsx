import AccountInformation from "./accountInformation";
import ContractInteraction from "./contractInteraction";
import AccountCreation from "./accountCreation";
import { useEffect, useState } from "react";
import useMassaStation from "../hooks/useMassaStation";

export default function Body() {
    const {
        account,
        accountSelected,
        balance,
        connect,
        connected,
        createAccount,
        errorMessage,
        accounts,
        getProviders,
        loadingProvider,
        providerSelected,
        setAccountSelected,
        setProviderSelected,
    } = useMassaStation();

    const [providersName, setProvidersNames] = useState<string[]>([]);

    useEffect(() => {
        if (getProviders) {
            setProviderSelected(getProviders[0]);
            setProvidersNames(getProviders.map((provider) => provider.name()));
        }
    }, [getProviders]);

    const handleChangeProvider = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedProviderName = event.target.value;
        const selectedProvider = getProviders?.find(
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
                {!connected && accounts && (
                    <div className=" p-5 border rounded-lg flex-col justify-start">
                        <div className="">
                            <p>Wallet:</p>
                            <select
                                key="providerSelect"
                                className="bodyButton"
                                onChange={handleChangeProvider}
                                value={providerSelected?.name()}
                            >
                                {getProviders?.map((provider, index) => (
                                    <option key={`provider_${provider.name()}`}>
                                        {providersName[index]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Account:</p>
                            <select
                                className="bodyButton"
                                onChange={handleChangeAccount}
                                value={accountSelected?.name()}
                            >
                                {accounts?.map((account, index) => (
                                    <option
                                        key={`account_${
                                            account.address + index.toString()
                                        }`}
                                    >
                                        {accounts[index].name()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="bodyButton" onClick={connect}>
                            Connect Wallet
                        </button>
                    </div>
                )}
                {!connected && !accounts && (
                    <>
                        <div className="bodyInformationRed">
                            <p>{loadingProvider}</p>
                            {!errorMessage && <div className="loader"></div>}
                        </div>
                    </>
                )}
                {!connected &&
                    providersName.length != 0 &&
                    accounts &&
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
