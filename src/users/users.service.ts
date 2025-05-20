import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan, MoreThanOrEqual } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class UserService {
  countInactive() {
      throw new Error('Method not implemented.');
  }
  countActive() {
      throw new Error('Method not implemented.');
  }
  countAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      isApproved: false, // By default, new users are inactive
    });
    
    return await this.usersRepository.save(newUser);
  }

  async findAll(query?: PaginationQueryDto) {
    // If no query parameters, return all users
    if (!query) {
      return await this.usersRepository.find();
    }

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    
    // Build the where clause for filtering
    const where: any = {};
    
    // Add date range filter if provided
    if (query.startDate || query.endDate) {
      where.createdAt = {};
      
      if (query.startDate && query.endDate) {
        // Add one day to include the end date fully
        const endDate = new Date(query.endDate);
        endDate.setDate(endDate.getDate() + 1);
        where.createdAt = Between(new Date(query.startDate), endDate);
      } else if (query.startDate) {
        where.createdAt = MoreThanOrEqual(new Date(query.startDate));
      } else if (query.endDate) {
        // Add one day to include the end date fully
        const endDate = new Date(query.endDate);
        endDate.setDate(endDate.getDate() + 1);
        where.createdAt = LessThan(endDate);
      }
    }
    
    // Get total count for pagination
    const total = await this.usersRepository.count({ where });
    
    // Get users with pagination
    const users = await this.usersRepository.find({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    });
    
    // Format the users for response
    const formattedUsers = users.map(user => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      status: user.isApproved ? 'Active' : 'Inactive',
      registeredDate: user.createdAt
    }));
    
    return {
      data: formattedUsers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    };
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    await this.usersRepository.delete(id);
    return { success: true, message: 'User deleted successfully' };
  }

  // Dashboard metrics
  async getMetrics() {
    const totalUsers = await this.usersRepository.count();
    const activeUsers = await this.usersRepository.count({ where: { isApproved: true } });
    const inactiveUsers = totalUsers - activeUsers;
    
    return {
      totalUsers,
      activeUsers,
      inactiveUsers
    };
  }
}