import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../../generated/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async create(userData: { email: string; password: string; nombres?: string; apellidos?: string; telefono?: string; role?: UserRole }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return this.prisma.usuario.create({
      data: {
        email: userData.email,
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        telefono: userData.telefono,
        password: hashedPassword,
        role: userData.role || UserRole.ESTUDIANTE,
      },
      select: {
        id_usuario: true,
        email: true,
        nombres: true,
        apellidos: true,
        telefono: true,
        role: true,
        fecha_creacion: true,
        activo: true,
      },
    });
  }
}