import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface AssetQueryParams {
  cognitoId?: string;
  wealthAssetType?: string;
  primaryAssetCategory?: string;
  includeInactive?: boolean;
}

export interface PointInTimeQueryParams {
  date: string;
  cognitoId?: string;
}

export interface AssetHistoryQueryParams {
  startDate?: string;
  endDate?: string;
}

export interface CreateAssetInput {
  assetInfo?: string;
  assetInfoType: string;
  nickname: string;
  balanceCurrent: number;
  balanceCostBasis?: number;
  balancePrice?: number;
  balanceQuantityCurrent?: number;
  wealthAssetType: string;
  primaryAssetCategory: string;
  holdings?: any;
  includeInNetWorth?: boolean;
  isFavorite?: boolean;
  cognitoId: string;
  userInstitutionId: string;
  wid: string;
  balanceAsOf?: string;
}

export interface UpdateAssetBalanceInput {
  balanceCurrent: number;
  balanceAsOf?: string;
  balanceCostBasis?: number;
  balancePrice?: number;
  balanceQuantityCurrent?: number;
  changeReason?: string;
}

export class RestClientService {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.NESTJS_SERVICE_URL || 'http://localhost:3000';

    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Asset CRUD operations
  async createAsset(input: CreateAssetInput): Promise<any> {
    const response: AxiosResponse = await this.client.post('/assets', input);
    return response.data;
  }

  async getAssetById(assetId: string): Promise<any> {
    const response: AxiosResponse = await this.client.get(`/assets/${assetId}`);
    return response.data;
  }

  // Historical queries
  async getAssetsAsOf(params: PointInTimeQueryParams): Promise<any[]> {
    const response: AxiosResponse = await this.client.get('/assets/as-of', { params });
    return response.data;
  }
}

export const restClientService = new RestClientService();
