import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum WealthAssetType {
    Cash
    Cryptocurrency
    RealEstate
    Vehicle
    Brokerage
  }

  enum PrimaryAssetCategory {
    Cash
    Investment
    RealEstate
    OtherProperty
  }

  enum AssetInfoType {
    ManualCash
    ManualCryptocurrency
    ManualRealEstate
    ManualVehicle
    ManualBrokerage
  }

  type AssetClass {
    minorAssetClass: String!
    value: Float!
  }

  type MajorAssetClass {
    majorClass: String!
    assetClasses: [AssetClass!]!
  }

  type AssetHoldings {
    majorAssetClasses: [MajorAssetClass!]!
  }

  type Asset {
    assetId: ID!
    assetInfo: String
    assetInfoType: AssetInfoType!
    nickname: String!
    balanceAsOf: String!
    balanceCurrent: Float!
    balanceCostBasis: Float!
    balancePrice: Float
    balanceQuantityCurrent: Float
    wealthAssetType: WealthAssetType!
    primaryAssetCategory: PrimaryAssetCategory!
    holdings: AssetHoldings
    includeInNetWorth: Boolean!
    isFavorite: Boolean!
    cognitoId: String!
    userInstitutionId: String!
    wid: String!
    creationDate: String!
    modificationDate: String!
    isActive: Boolean!
  }

  input AssetHoldingsInput {
    majorAssetClasses: [MajorAssetClassInput!]!
  }

  input MajorAssetClassInput {
    majorClass: String!
    assetClasses: [AssetClassInput!]!
  }

  input AssetClassInput {
    minorAssetClass: String!
    value: Float!
  }

  input CreateAssetInput {
    assetInfo: String
    assetInfoType: AssetInfoType!
    nickname: String!
    balanceCurrent: Float!
    balanceCostBasis: Float
    balancePrice: Float
    balanceQuantityCurrent: Float
    wealthAssetType: WealthAssetType!
    primaryAssetCategory: PrimaryAssetCategory!
    holdings: AssetHoldingsInput
    includeInNetWorth: Boolean
    isFavorite: Boolean
    cognitoId: String!
    userInstitutionId: String!
    wid: String!
    balanceAsOf: String
  }

  type Query {
    asset(id: ID!): Asset

    # Historical queries
    assetsAsOf(date: String!, cognitoId: String): [Asset!]!
  }

  type Mutation {
    createAsset(input: CreateAssetInput!): Asset!
  }
`;
