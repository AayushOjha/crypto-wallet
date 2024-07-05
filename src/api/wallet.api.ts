import { Alchemy, Network } from "alchemy-sdk";
import { IFetchWalletDataPayload } from "../types/common";

const config = {
  apiKey: "S3KWyYvLdh1tU7P04SAtqGpszYZkkYfn", // TODO: remove it from here and but in safe place
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

const baseURL = `https://api.blockcypher.com/v1/btc/test`;

const getTnxs = (address: string) => {
  return alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: address,
    category: ["external", "internal", "erc20", "erc721", "erc1155"] as any,
  });
};

const getTnxsAll = async (props: IFetchWalletDataPayload[]) => {
  return await Promise.all(
    props.map((x) => {
      return alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: x.address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"] as any,
      });
    })
  );
};

const WalletApi = { getTnxs, getTnxsAll };
export { WalletApi };
