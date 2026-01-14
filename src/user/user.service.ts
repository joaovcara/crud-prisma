import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { prisma } from '../lib/prisma';
import { hashSync } from 'bcryptjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const passwordHash = hashSync(createUserDto.password, 10);
    createUserDto.password = passwordHash;

    const user = await prisma.user.create({
      data: createUserDto,
    });
    return plainToInstance(UserResponseDto, user);
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return plainToInstance(UserResponseDto, users);
  }

  async findOne(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? plainToInstance(UserResponseDto, user) : null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return plainToInstance(UserResponseDto, user);
  }

  async remove(id: number) {
    const user = await prisma.user.delete({
      where: { id },
    });
    return plainToInstance(UserResponseDto, user);
  }
}
