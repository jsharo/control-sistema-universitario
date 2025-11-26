import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../../generated/prisma';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    const payload = {
      sub: user.id_usuario,
      email: user.email,
      role: user.role,
      nombres: user.nombres,
      apellidos: user.apellidos,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_usuario,
        email: user.email,
        nombres: user.nombres,
        apellidos: user.apellidos,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }

    // Convertir el rol string a enum si es válido
    let userRole: UserRole = UserRole.ESTUDIANTE; // Default
    if (registerDto.role && Object.values(UserRole).includes(registerDto.role as UserRole)) {
      userRole = registerDto.role as UserRole;
    }

    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      nombres: registerDto.nombres,
      apellidos: registerDto.apellidos,
      telefono: registerDto.telefono,
      role: userRole,
    });
    
    const payload = {
      sub: user.id_usuario,
      email: user.email,
      role: user.role,
      nombres: user.nombres,
      apellidos: user.apellidos,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_usuario,
        email: user.email,
        nombres: user.nombres,
        apellidos: user.apellidos,
        role: user.role,
      },
    };
  }
}