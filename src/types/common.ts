export interface IWalletInstance {
  address: string;
  transactions: [];
  total: number;
}

export interface IWalletSlice {
  wallets: { [key: string]: IWalletInstance };
  syncing: boolean;
}