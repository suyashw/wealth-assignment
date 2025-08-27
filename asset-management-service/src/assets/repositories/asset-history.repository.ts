import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AssetHistory } from '../entities/asset-history.entity';
import { AssetHistoryQueryDto } from '../dto/asset.dto';

@Injectable()
export class AssetHistoryRepository {
  private readonly logger = new Logger(AssetHistoryRepository.name);

  constructor(
    @InjectRepository(AssetHistory)
    private readonly repository: MongoRepository<AssetHistory>,
  ) {}

  async create(historyData: Partial<AssetHistory>): Promise<AssetHistory> {
    this.logger.debug(`Creating asset history record for asset: ${historyData.assetId}`);
    const historyRecord = this.repository.create(historyData);
    return await this.repository.save(historyRecord);
  }

  async findByAssetId(query: AssetHistoryQueryDto): Promise<AssetHistory[]> {
    const mongoQuery: any = { assetId: query.assetId };

    if (query.startDate || query.endDate) {
      mongoQuery.balanceAsOf = {};

      if (query.startDate) {
        mongoQuery.balanceAsOf.$gte = new Date(query.startDate);
      }

      if (query.endDate) {
        mongoQuery.balanceAsOf.$lte = new Date(query.endDate);
      }
    }

    return await this.repository.find({
      where: mongoQuery,
      order: { balanceAsOf: 'DESC' }
    });
  }

  async getBalanceHistory(cognitoId: string, days: number = 30): Promise<AssetHistory[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await this.repository.find({
      where: {
        cognitoId,
        balanceAsOf: { $gte: startDate }
      },
      order: { balanceAsOf: 'DESC' }
    });
  }
}
