import { Entity, Column, ObjectIdColumn, ObjectId, Index, CreateDateColumn } from 'typeorm';

@Entity('asset_history')
@Index(['assetId', 'balanceAsOf'])
@Index(['assetId', 'balanceAsOf'], { background: true })
@Index(['balanceAsOf'])
@Index(['cognitoId', 'balanceAsOf'])
export class AssetHistory {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  assetId: string;

  @Column()
  cognitoId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  balanceCurrent: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  balanceCostBasis?: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  balancePrice?: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  balanceQuantityCurrent?: number;

  @Column()
  balanceAsOf: Date;

  @Column({ default: 'UserManual' })
  balanceFrom: string;

  @Column({ nullable: true })
  changeReason?: string;

  @Column({ nullable: true })
  previousBalance?: number;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  // Computed field to get string representation of ObjectId
  get id(): string {
    return this._id.toHexString();
  }
}
