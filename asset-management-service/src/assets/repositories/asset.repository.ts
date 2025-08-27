import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Asset } from '../entities/asset.entity';
import { AssetQueryDto, PointInTimeQueryDto } from '../dto/asset.dto';

@Injectable()
export class AssetRepository {
  private readonly logger = new Logger(AssetRepository.name);

  constructor(
    @InjectRepository(Asset)
    private readonly repository: MongoRepository<Asset>,
  ) {}

  async create(assetData: Partial<Asset>): Promise<Asset> {
    this.logger.debug(`Creating new asset: ${assetData.nickname}`);
    const asset = this.repository.create(assetData);
    return await this.repository.save(asset);
  }

  async findById(assetId: string): Promise<Asset | null> {
    return await this.repository.findOne({ where: { assetId } });
  }

  /**
   * Point-in-time query: Get all assets as of a specific date
   */
  async findAssetsAsOf(query: PointInTimeQueryDto): Promise<Asset[]> {
    const queryDate = new Date(query.date);
    const mongoQuery: any = {
      balanceAsOf: { $lte: queryDate },
      isActive: true,
    };

    if (query.cognitoId) {
      mongoQuery.cognitoId = query.cognitoId;
    }

    // Get the most recent record for each asset up to the query date
    const assets = await this.repository.aggregate([
      { $match: mongoQuery },
      { $sort: { assetId: 1, balanceAsOf: -1 } },
      {
        $group: {
          _id: '$assetId',
          mostRecent: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: '$mostRecent' } },
      { $sort: { primaryAssetCategory: 1, nickname: 1 } }
    ]).toArray();

    return assets;
  }
}
