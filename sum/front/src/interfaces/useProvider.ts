import { IAccount, IAccountBalanceResponse } from "@massalabs/wallet-provider";

export interface useProvider {
    connected: boolean;
    balance: IAccountBalanceResponse;
    account: IAccount | null;
    errorMessage: any;
    connect: () => void;
    createAccount: (name: string) => void;
}
