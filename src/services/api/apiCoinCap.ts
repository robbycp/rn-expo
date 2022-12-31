import type {Endpoint} from '~/types/api';
import {createAxios, createExportedEndpoint} from '~/utils/api';

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

const apiCoinCapBase = createAxios({
  baseURL: 'https://api.coincap.io/v2',
});
export interface ResponseCoinCap {
  assetsGet: Endpoint<
    object,
    {
      data: Asset[];
      timestamp: number;
    }
  >;
}
export const endpoints: ResponseCoinCap = {
  assetsGet: {
    method: 'get',
    path: '/assets',
    response: {data: [], timestamp: 0},
  },
};

export default createExportedEndpoint(apiCoinCapBase, endpoints);
