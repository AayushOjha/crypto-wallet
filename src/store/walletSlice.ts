import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IFetchWalletDataPayload,
  IWalletInstance,
  IWalletSlice,
} from "../types/common";
import { WalletApi } from "../api/wallet.api";

const initialState: IWalletSlice = {
  wallets: {},
  syncing: false,
};

const fetchWalletData = createAsyncThunk(
  "wallets/fetchWalletsData",
  async ({ address, name }: IFetchWalletDataPayload) => {
    const response = await WalletApi.getTnxs(address);
    return { response, name, address };
  }
);

export const walletSlice = createSlice({
  name: "wallets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletData.pending, (state, action) => {
        state.syncing = true;
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        let total = 0;
        action.payload.response.transfers.forEach(x => {
          total += x.value || 0
        })
        state.wallets[action.payload.address] = {
          name: action.payload.name,
          total,
          transactions: action.payload.response.transfers.map(
            ({ asset, category, value }) => ({ asset, category, value })
          ),
        };
        state.syncing = false;
      }).addCase(fetchWalletData.rejected, (state, action) => {
        console.error(action.payload)
        alert("Some thing went wrong!")
        state.syncing = false;
      })
  },
});

export { fetchWalletData };
export default walletSlice.reducer;
