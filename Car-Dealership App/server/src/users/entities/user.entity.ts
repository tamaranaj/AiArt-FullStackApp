import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../common/types/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';
import { Type } from 'class-transformer';
import { Car } from 'src/cars/entities/car.entity';

@Unique(['email'])
@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @ApiProperty()
  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  refreshTokens: string[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  createdBy: string | null;

  @ApiProperty()
  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date | null;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  updatedBy: string | null;

  @DeleteDateColumn({
    nullable: true,
    select: false,
  })
  deletedAt: Date | null;

  @Column({
    nullable: true,
    select: false,
  })
  deletedBy: string | null;
  
 
  @Column("simple-array" ,{
    nullable:true
  })
  @OneToMany(()=>Order, (order)=>order.buyer)
  @ApiProperty()
  @Type(()=> Order)
  orders: Order [] 

 
  @Column("simple-array", {
    nullable:true
  })
  @OneToMany(()=>Car, (car)=>car.seller)
  @ApiProperty()
  @Type(()=> Car)
  createdCars: Car []
}
