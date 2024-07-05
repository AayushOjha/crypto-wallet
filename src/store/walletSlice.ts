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

const fetchAllWalletData = createAsyncThunk(
  "wallets/fetchAllWalletData",
  async (props: IFetchWalletDataPayload[]) => {
    const response = await WalletApi.getTnxsAll(props);
    return { response, props };
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
        action.payload.response.transfers.forEach((x) => {
          total += x.value || 0;
        });
        state.wallets[action.payload.address] = {
          name: action.payload.name,
          total,
          transactions: action.payload.response.transfers.map(
            ({ asset, category, value }) => ({ asset, category, value })
          ),
        };
        state.syncing = false;
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        console.error(action.payload);
        alert("Some thing went wrong!");
        state.syncing = false;
      })
      .addCase(fetchAllWalletData.pending, (state) => {
        state.syncing = true;
      })
      .addCase(fetchAllWalletData.fulfilled, (state, action) => {
        for (const index in action.payload.props) { 
          let total = 0;
          let mapItem = action.payload.response[index]
          mapItem.transfers.forEach((x) => {
            total += x.value || 0;
          });
          state.wallets[action.payload.props[index].address] = {
            name: action.payload.props[index].name,
            total,
            transactions: mapItem.transfers.map(
              ({ asset, category, value }) => ({ asset, category, value })
            ),
          };
        }
        state.syncing = false;
      })
      .addCase(fetchAllWalletData.rejected, (state, action) => {
        console.error(action.payload);
        alert("Some thing went wrong!");
        state.syncing = false;
      });
  },
});

export { fetchWalletData, fetchAllWalletData };
export default walletSlice.reducer;
