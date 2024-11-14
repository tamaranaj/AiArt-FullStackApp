import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Id of the order',
    example: '00000000-0000-0000-0000-000000000000',
  })
  id: string;

  @OneToOne(() => Car, (car) => car.id)
  @JoinColumn({name: 'carId'})
  @ApiProperty({
    description: 'Purchased car',
    type: Car,
  })
  @Type(() => Car)
  car: Car;

  @Column({
    select: false,
    nullable: true
  })
  carId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({name: "buyerId"})
  @ApiProperty({
    description: 'User who made the order',
    type:()=> User,
  })
  @Type(() => User)
  buyer: User;

  @Column({
    select: false,
    nullable: true
  })
  buyerId: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date when the order was created',
    example: '2023-01-01',
  })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @ApiPropertyOptional({
    description: 'Date when the order was updated',
    example: '2023-01-01',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt: Date | null;
}
