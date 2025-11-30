import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppService } from '../app.service';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private appService: AppService) {}

  private get db() {
    return this.appService.getDB();
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      ...createUserDto,
    };

    this.db.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.db.users;
  }

  findOne(id: string): User {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = {
      ...this.db.users[userIndex],
      ...updateUserDto,
      version: this.db.users[userIndex].version + 1,
      updatedAt: Date.now(),
    };

    this.db.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: string): void {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.db.users.splice(userIndex, 1);
  }
}
