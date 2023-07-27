import {
    IAccount,
    IAccountBalanceResponse,
    IProvider,
} from "@massalabs/wallet-provider";

export interface ProviderService {
    connected: boolean;
    balance: IAccountBalanceResponse;
    account: IAccount | null;
    accounts: IAccount[] | null;
    connect(account: IAccount): Promise<void>;
    createAccount(accountName: string, provider: IProvider): Promise<void>;
    providerList: IProvider[] | null;
    selectedProvider: IProvider | null;
    setSelectedProvider: (provider: IProvider) => void;
    selectedAccount: IAccount | null;
    setSelectedAccount: (account: IAccount) => void;
    loadingProvider: string;
    errorMessage: any;
}
