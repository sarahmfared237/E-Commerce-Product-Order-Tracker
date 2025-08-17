import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  // Register new user
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.userService.register(registerDto);
  }

  // Login
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.userService.login(loginDto);
  }
}