import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class AppService {
  async getUser(): Promise<string> {
    const name = await prisma.user.findFirst().then(user => user?.name || 'No user found');
    return name;
  }
}
