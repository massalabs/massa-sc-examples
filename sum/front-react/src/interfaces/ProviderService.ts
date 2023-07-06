import { IAccount, IAccountBalanceResponse } from "@massalabs/wallet-provider";

export interface ProviderService {
    connected: boolean;
    balance: IAccountBalanceResponse;
    account: IAccount | null;
    errorMessage: any;
    connect(): Promise<void>;
    createAccount(accountName: string): Promise<void>;
}
