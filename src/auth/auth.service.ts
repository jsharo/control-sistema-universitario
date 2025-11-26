import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
type UserRoleValue = 'ESTUDIANTE' | 'DOCENTE' | 'ADMIN' | 'COORDINADOR';
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

  
    const VALID_ROLES: UserRoleValue[] = ['ESTUDIANTE','DOCENTE','ADMIN','COORDINADOR'];
    let userRole: UserRoleValue = 'ESTUDIANTE'; // Default
    if (registerDto.role && VALID_ROLES.includes(registerDto.role as UserRoleValue)) {
      userRole = registerDto.role as UserRoleValue;
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