import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IWalletInstance, IWalletSlice } from "../types/common";
import { WalletApi } from "../api/wallet.api";

const initialState: IWalletSlice = {
  wallets: {},
  syncing: false,
};

const fetchWalletData = createAsyncThunk(
  "wallets/fetchWalletsData",
  async (address: string) => {
    const response = await WalletApi.get(address)
    return response;
  }
);

export const walletSlice = createSlice({
  name: "wallets",
  initialState: initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<string>) => {
      const newWallet: IWalletInstance = {
        address: action.payload,
        transactions: [],
        total: 0,
      };
      state.wallets[action.payload] = newWallet;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletData.pending, (state, action) => {
        state.syncing = true;
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        console.dir(action);
        // state.wallets[payload] = {address: payload, total: 0, }
        state.syncing = false;
      });
  },
});

export { fetchWalletData };
export default walletSlice.reducer;
