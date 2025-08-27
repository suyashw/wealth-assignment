export enum WealthAssetType {
  Cash = 'Cash',
  Cryptocurrency = 'Cryptocurrency', 
  RealEstate = 'RealEstate',
  Vehicle = 'Vehicle',
  Brokerage = 'Brokerage',
}

export enum PrimaryAssetCategory {
  Cash = 'Cash',
  Investment = 'Investment',
  RealEstate = 'RealEstate',
  OtherProperty = 'OtherProperty',
}

export enum AssetInfoType {
  ManualCash = 'ManualCash',
  ManualCryptocurrency = 'ManualCryptocurrency',
  ManualRealEstate = 'ManualRealEstate',
  ManualVehicle = 'ManualVehicle',
  ManualBrokerage = 'ManualBrokerage',
}

export interface AssetHoldings {
  majorAssetClasses: MajorAssetClass[];
}

export interface MajorAssetClass {
  majorClass: string;
  assetClasses: AssetClass[];
}

export interface AssetClass {
  minorAssetClass: string;
  value: number;
}

export interface CreateAssetInput {
  assetInfo: string;
  assetInfoType: AssetInfoType;
  nickname: string;
  balanceCurrent: number;
  balanceCostBasis?: number;
  wealthAssetType: WealthAssetType;
  primaryAssetCategory: PrimaryAssetCategory;
  holdings?: AssetHoldings;
  includeInNetWorth?: boolean;
  isFavorite?: boolean;
  cognitoId: string;
}

export interface UpdateAssetBalanceInput {
  assetId: string;
  balanceCurrent: number;
  balanceAsOf?: Date;
}

export interface Asset {
  assetId: string;
  assetInfo?: string;
  assetInfoType: AssetInfoType;
  nickname: string;
  balanceAsOf: Date;
  balanceCurrent: number;
  balanceCostBasis: number;
  wealthAssetType: WealthAssetType;
  primaryAssetCategory: PrimaryAssetCategory;
  holdings?: AssetHoldings;
  includeInNetWorth: boolean;
  isFavorite: boolean;
  cognitoId: string;
  creationDate: Date;
  modificationDate: Date;
  isActive: boolean;
}

export interface AssetHistoryRecord {
  id: string;
  assetId: string;
  balanceCurrent: number;
  balanceAsOf: Date;
  balanceCostBasis?: number;
  createdAt: Date;
}

export interface PointInTimeQuery {
  date: string; // ISO date string
  cognitoId?: string;
}

export interface AssetHistoryQuery {
  assetId: string;
  startDate?: Date;
  endDate?: Date;
}
