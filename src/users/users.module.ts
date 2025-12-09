import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthPrismaService } from 'src/prisma/auth.prisma.service';

@Module({
  providers: [UsersService, AuthPrismaService],
  exports: [UsersService],
})
export class UsersModule {}