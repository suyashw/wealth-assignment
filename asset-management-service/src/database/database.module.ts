import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Asset } from '@/assets/entities/asset.entity';
import { AssetHistory } from '@/assets/entities/asset-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('database.uri'),
        database: configService.get<string>('database.name'),
        entities: [Asset, AssetHistory],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV === 'development',
        retryWrites: true,
        w: 'majority',
      }),
    }),
  ],
})
export class DatabaseModule {}
