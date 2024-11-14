import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CurrentUser } from '../common/types/current-user.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createOrderDto: CreateOrderDto, user: CurrentUser) {
    
    console.log('user in create user',user)
    return this.orderRepository.save({
      ...createOrderDto,
      buyerId: user.userId
      
    });
    
  }

  findAll(user: CurrentUser) {
    return this.orderRepository.find({where: {buyerId:user.userId }, relations: ['buyer', 'car']});
  }

  findOne(id: string) {
    try {
      return this.orderRepository.find({where: {id: id}, relations: ['car']});
    } catch (error) {
      console.error('Error finding car', error);
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    try {
      await this.orderRepository.update(id, updateOrderDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Error while updating order');
    }
  }

  async remove(id: string) {
    await this.orderRepository.softDelete(id);
  }
}
