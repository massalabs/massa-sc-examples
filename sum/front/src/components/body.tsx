import AccountInformation from "./accountInformation";
import ContractInteraction from "./contractInteraction";
import AccountCreation from "./accountCreation";
import { useContext, useEffect, useState } from "react";
import { MassaContext } from "../App";

export default function Body() {
    const {
        account,
        accounts,
        connected,
        loadingProvider,
        providerList,
        selectedProvider,
        errorMessage,
    } = useContext(MassaContext)!; // Use the context

    const isLoadingProvider = providerList?.length === 0;

    const noAccount = !!accounts && !isLoadingProvider && accounts.length === 0;

    const disconnected = !connected && accounts && accounts.length > 0;

    return (
        <div className="body flex-col justify-center align-middle">
            {isLoadingProvider && (
                <div className="bodyInformationRed w-1/3 m-auto">
                    <p>{loadingProvider}</p>
                    {!errorMessage && <div className="loader"></div>}
                </div>
            )}

            {!isLoadingProvider && !connected && <SelectProvider />}

            {noAccount && disconnected && (
                <>
                    <AccountCreation />
                </>
            )}

            {disconnected && <ConnectionForm />}

            {connected && (
                <div className="flex-col">
                    <AccountInformation />
                    <ContractInteraction />
                </div>
            )}

            <div className="mas-h2 text-red-500">{errorMessage}</div>
        </div>
    );
}

function SelectProvider() {
    const [providersName, setProvidersNames] = useState<string[]>([]);
    const { providerList, selectedProvider, setSelectedProvider } =
        useContext(MassaContext)!; // Use the context

    useEffect(() => {
        if (providerList) {
            setSelectedProvider(providerList[0]);
            setProvidersNames(providerList.map((provider) => provider.name()));
        }
    }, [providerList]);

    const handleChangeProvider = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedProviderName = event.target.value;
        const selectedProvider = providerList?.find(
            (provider) => provider.name() === selectedProviderName
        );
        if (selectedProvider) {
            setSelectedProvider(selectedProvider);
        }
    };

    return (
        <div className="">
            <p>Wallet:</p>
            <select
                key="providerSelect"
                className="bodyButton"
                onChange={handleChangeProvider}
                value={selectedProvider?.name()}
            >
                {providerList?.map((provider, index) => (
                    <option key={`provider_${provider.name()}`}>
                        {providersName[index]}
                    </option>
                ))}
            </select>
        </div>
    );
}

function ConnectionForm() {
    const { accounts, connect, selectedAccount, setSelectedAccount } =
        useContext(MassaContext)!; // Use the context

    const handleChangeAccount = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedAccountName = event.target.value;
        const selectedAccount = accounts?.find(
            (account) => account.name() === selectedAccountName
        );
        if (selectedAccount) {
            setSelectedAccount(selectedAccount);
        }
    };

    return (
        <div className=" p-5 border rounded-lg flex-col justify-start bg-gray-100 gap-5 h-3/4 w-1/3 m-auto">
            <div>
                <p>Account:</p>
                <select
                    className="bodyButton"
                    onChange={handleChangeAccount}
                    value={selectedAccount?.name()}
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
            <button
                className="bodyButton"
                onClick={() => connect(selectedAccount!)}
                disabled={!selectedAccount}
            >
                Connect Wallet
            </button>
        </div>
    );
}
