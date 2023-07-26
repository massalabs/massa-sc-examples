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
    providerList: IProvider[] | null;
    setProviderSelected: (provider: IProvider) => void;
    providerSelected: IProvider | null;
    accounts: IAccount[] | null;
    setAccountSelected: (account: IAccount) => void;
    accountSelected: IAccount | null;
    loadingProvider: string;
}
