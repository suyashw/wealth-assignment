import { Entity, Column, ObjectIdColumn, ObjectId, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WealthAssetType, PrimaryAssetCategory, AssetInfoType, AssetHoldings } from '../../shared/types/index';

@Entity('assets')
@Index(['cognitoId', 'isActive'])
@Index(['cognitoId', 'wealthAssetType'])
@Index(['cognitoId', 'primaryAssetCategory'])
export class Asset {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  assetId: string;

  @Column({ nullable: true })
  assetDescription?: string;

  @Column({ type: 'text', nullable: true })
  assetInfo?: string;

  @Column({
    type: 'enum',
    enum: AssetInfoType,
  })
  assetInfoType: AssetInfoType;

  @Column({ nullable: true })
  assetMask?: string;

  @Column({ nullable: true })
  assetName?: string;

  @Column({ nullable: true })
  assetOwnerName?: string;

  @Column()
  balanceAsOf: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  balanceCurrent: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balanceCostBasis: number;

  @Column({ default: 'UserManual' })
  balanceCostFrom: string;

  @Column({ default: 'UserManual' })
  balanceFrom: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  balancePrice?: number;

  @Column({ default: 'UserManual' })
  balancePriceFrom: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  balanceQuantityCurrent?: number;

  @Column({ nullable: true })
  beneficiaryComposition?: string;

  @Column()
  cognitoId: string;

  @Column({ nullable: true })
  currencyCode?: string;

  @Column({ nullable: true })
  deactivateBy?: Date;

  @Column({ default: '' })
  descriptionEstatePlan: string;

  @Column({ nullable: true })
  hasInvestment?: boolean;

  @Column({ type: 'json', nullable: true })
  holdings?: AssetHoldings;

  @Column({ default: true })
  includeInNetWorth: boolean;

  @Column({ default: 101 })
  institutionId: number;

  @Column({ nullable: true })
  institutionName?: string;

  @Column({ nullable: true })
  integration?: string;

  @Column({ nullable: true })
  integrationAccountId?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isAsset: boolean;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ nullable: true })
  isLinkedVendor?: boolean;

  @Column({ nullable: true })
  lastUpdate?: Date;

  @Column({ nullable: true })
  lastUpdateAttempt?: Date;

  @Column({ nullable: true })
  logoName?: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  note?: string;

  @Column({ nullable: true })
  noteDate?: Date;

  @Column({ nullable: true })
  ownership?: string;

  @Column({
    type: 'enum',
    enum: PrimaryAssetCategory,
  })
  primaryAssetCategory: PrimaryAssetCategory;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  statusCode?: string;

  @Column()
  userInstitutionId: string;

  @Column({ nullable: true })
  vendorAccountType?: string;

  @Column({ nullable: true })
  vendorContainer?: string;

  @Column({ nullable: true })
  vendorResponse?: string;

  @Column({ default: 'Other' })
  vendorResponseType: string;

  @Column({
    type: 'enum',
    enum: WealthAssetType,
  })
  wealthAssetType: WealthAssetType;

  @Column()
  wid: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  modificationDate: Date;
}
