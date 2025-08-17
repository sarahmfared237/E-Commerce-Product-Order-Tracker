import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './entities/user.entity';
import { Role, RoleDocument } from './entities/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private jwtService: JwtService,
  ) {}

  // 🔹 Register new user
  async register(registerDto: RegisterDto): Promise<UserProfileDto> {
    const { username, email, password } = registerDto;

    // check if user exists
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    // assign default role "customer"
    const userCount = await this.userModel.countDocuments();
    let roleName = 'customer';
    if (userCount === 0) {
      roleName = 'admin';
    }
    const role = await this.roleModel.findOne({ name: roleName });
    if (!role) {
      throw new NotFoundException(`Default role '${roleName}' not found`);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role: role._id,
    });

    return new UserProfileDto(await user.save());
  }

  // 🔹 Generate JWT token
  async generateToken(userId: any) {
    const payload = { sub: userId }; 
    return this.jwtService.sign(payload);
  }
  // Login user
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).populate('role');
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = await this.generateToken(user._id);
    return new LoginResponseDto(token, user);
  }
}