export interface ITransaction {
  asset: string | null;
  category: string;
  value: number | null;
}
export interface IWalletInstance {
  name: string;
  transactions: ITransaction[];
  total: number;
}

export interface IWalletSlice {
  wallets: { [key: string]: IWalletInstance };
  syncing: boolean;
}

export interface IFetchWalletDataPayload {
  name: string;
  address: string;
}
