import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateAssetDto, PointInTimeQueryDto } from './dto/asset.dto';
import { Asset } from './entities/asset.entity';
import { AssetService } from './asset.service';

@ApiTags('assets')
@Controller('assets')
export class AssetController {
  private readonly logger = new Logger(AssetController.name);

  constructor(private readonly assetService: AssetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({ status: 201, description: 'Asset created successfully', type: Asset })
  async createAsset(@Body() createAssetDto: CreateAssetDto): Promise<Asset> {
    this.logger.log(`POST /assets - Creating asset: ${createAssetDto.nickname}`);
    return await this.assetService.createAsset(createAssetDto);
  }

  @Get('as-of')
  @ApiOperation({ summary: 'Get all assets as of a specific date (point-in-time query)' })
  @ApiResponse({ status: 200, description: 'Historical assets retrieved successfully', type: [Asset] })
  async getAssetsAsOf(@Query() query: PointInTimeQueryDto): Promise<Asset[]> {
    this.logger.log(`GET /assets/as-of - Point-in-time query for date: ${query.date}`);
    return await this.assetService.getAssetsAsOf(query);
  }

  @Get(':assetId')
  @ApiOperation({ summary: 'Get asset by ID' })
  @ApiResponse({ status: 200, description: 'Asset retrieved successfully', type: Asset })
  @ApiParam({ name: 'assetId', description: 'Asset ID' })
  async getAssetById(@Param('assetId') assetId: string): Promise<Asset> {
    this.logger.log(`GET /assets/${assetId} - Fetching asset by ID`);
    return await this.assetService.getAssetById(assetId);
  }
}
