import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from 'lib/prisma';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }

  findOne(id: number) {
    const user = prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  remove(id: number) {
    const user = prisma.user.delete({
      where: { id },
    });
    return user;
  }
}
