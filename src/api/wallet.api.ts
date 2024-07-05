import axios, { AxiosResponse } from "axios";

const baseURL = `https://api.blockcypher.com/v1/btc/test`;

const get = (address: string): Promise<AxiosResponse<{ data: any }>> => {
  console.log(`add: `, address);
  return axios.get(`${baseURL}/addrs/${address}/balance`);
};

const WalletApi = { get };
export { WalletApi };
