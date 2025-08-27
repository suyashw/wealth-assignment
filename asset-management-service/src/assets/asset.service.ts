import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AssetRepository } from './repositories/asset.repository';
import { AssetHistoryRepository } from './repositories/asset-history.repository';
import { Asset } from './entities/asset.entity';
import { AssetHistory } from './entities/asset-history.entity';
import { CreateAssetDto, PointInTimeQueryDto } from './dto/asset.dto';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(
    private readonly assetRepository: AssetRepository,
    private readonly assetHistoryRepository: AssetHistoryRepository,
  ) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    this.logger.log(`Creating new asset: ${createAssetDto.nickname}`);

    const assetData: Partial<Asset> = {
      assetId: uuidv4(),
      ...createAssetDto,
      balanceAsOf: createAssetDto.balanceAsOf ? new Date(createAssetDto.balanceAsOf) : new Date(),
      balanceCostBasis: createAssetDto.balanceCostBasis || 0,
      includeInNetWorth: true,
      isFavorite: false,
      isActive: true,
      institutionId: 101,
      vendorResponseType: 'Other',
      balanceCostFrom: 'UserManual',
      balanceFrom: 'UserManual',
      balancePriceFrom: 'UserManual',
    };

    const asset = await this.assetRepository.create(assetData);

    // Create initial history record
    await this.createHistoryRecord(asset, 'Initial creation');

    return asset;
  }

  async getAssetById(assetId: string): Promise<Asset> {
    const asset = await this.assetRepository.findById(assetId);
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }
    return asset;
  }

  /**
   * Get assets as of a specific point in time (core historical functionality)
   */
  async getAssetsAsOf(query: PointInTimeQueryDto): Promise<Asset[]> {
    this.logger.log(`Fetching assets as of date: ${query.date}`);
    return await this.assetRepository.findAssetsAsOf(query);
  }

  private async createHistoryRecord(
    asset: Asset,
    changeReason: string,
    previousBalance?: number
  ): Promise<AssetHistory> {
    const historyData: Partial<AssetHistory> = {
      assetId: asset.assetId,
      cognitoId: asset.cognitoId,
      balanceCurrent: asset.balanceCurrent,
      balanceCostBasis: asset.balanceCostBasis,
      balanceAsOf: asset.balanceAsOf,
      balanceFrom: asset.balanceFrom,
      changeReason,
      previousBalance,
      metadata: {
        wealthAssetType: asset.wealthAssetType,
        primaryAssetCategory: asset.primaryAssetCategory,
        nickname: asset.nickname,
      },
    };

    return await this.assetHistoryRepository.create(historyData);
  }
}
