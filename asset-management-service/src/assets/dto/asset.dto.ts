import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WealthAssetType, PrimaryAssetCategory, AssetInfoType, AssetHoldings } from '../../shared/types/index';

// Create Asset DTO
export class CreateAssetDto {
  @ApiProperty({ description: 'Asset information as JSON string' })
  @IsString()
  @IsOptional()
  assetInfo?: string;

  @ApiProperty({ enum: AssetInfoType })
  @IsEnum(AssetInfoType)
  assetInfoType: AssetInfoType;

  @ApiProperty({ description: 'Display name for the asset' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: 'Current balance value', example: 5000.00 })
  @IsNumber({ maxDecimalPlaces: 2 })
  balanceCurrent: number;

  @ApiProperty({ description: 'Cost basis of the asset', required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  balanceCostBasis?: number;

  @ApiProperty({ enum: WealthAssetType })
  @IsEnum(WealthAssetType)
  wealthAssetType: WealthAssetType;

  @ApiProperty({ enum: PrimaryAssetCategory })
  @IsEnum(PrimaryAssetCategory)
  primaryAssetCategory: PrimaryAssetCategory;

  @ApiProperty({ description: 'Asset holdings breakdown', required: false })
  @IsOptional()
  holdings?: AssetHoldings;

  @ApiProperty({ description: 'User identifier' })
  @IsString()
  cognitoId: string;

  @ApiProperty({ description: 'User institution identifier' })
  @IsString()
  userInstitutionId: string;

  @ApiProperty({ description: 'Wealth identifier' })
  @IsString()
  wid: string;

  @ApiProperty({ description: 'Balance as of date', required: false })
  @IsOptional()
  @IsDateString()
  balanceAsOf?: string;
}

// Query DTOs
export class AssetQueryDto {
  @ApiProperty({ description: 'User identifier', required: false })
  @IsOptional()
  @IsString()
  cognitoId?: string;

  @ApiProperty({ enum: WealthAssetType, required: false })
  @IsOptional()
  @IsEnum(WealthAssetType)
  wealthAssetType?: WealthAssetType;
}

export class PointInTimeQueryDto {
  @ApiProperty({ description: 'Date to query assets as of (ISO string)' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'User identifier', required: false })
  @IsOptional()
  @IsString()
  cognitoId?: string;
}

export class AssetHistoryQueryDto {
  @ApiProperty({ description: 'Asset ID to get history for' })
  @IsString()
  assetId: string;

  @ApiProperty({ description: 'Start date for history range', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'End date for history range', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
