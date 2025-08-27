import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { AssetHistory } from './entities/asset-history.entity';
import { AssetRepository } from './repositories/asset.repository';
import { AssetHistoryRepository } from './repositories/asset-history.repository';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, AssetHistory]),
  ],
  controllers: [AssetController],
  providers: [
    AssetService,
    AssetRepository,
    AssetHistoryRepository,
  ],
  exports: [
    AssetService,
    AssetRepository,
    AssetHistoryRepository,
  ],
})
export class AssetModule {}
