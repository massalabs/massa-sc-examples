import {
    IAccount,
    IAccountBalanceResponse,
    IProvider,
} from "@massalabs/wallet-provider";

export interface ProviderService {
    connected: boolean;
    balance: IAccountBalanceResponse;
    account: IAccount | null;
    errorMessage: any;
    connect(): Promise<void>;
    createAccount(accountName: string): Promise<void>;
    getProviders: IProvider[] | null;
    setProviderSelected: (provider: IProvider) => void;
    providerSelected: IProvider | null;
    getAccounts: IAccount[] | null;
    setAccountSelected: (account: IAccount) => void;
    accountSelected: IAccount | null;
    loadingProvider: string;
}
