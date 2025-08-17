import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Role, RoleSchema } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },  
    ]),
      JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),

  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
