import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findBbUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createAccount(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.password = dto.password;
    return await this.userRepository.save(user);
  }
}
