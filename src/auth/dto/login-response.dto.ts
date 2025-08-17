import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserDocument } from '../entities/user.entity';
import { Types } from 'mongoose';
import { UserProfileDto } from './user-profile.dto';

export class LoginResponseDto {
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    user: UserProfileDto;

    constructor(token: string, user: UserDocument) {
        this.token = token;
        this.user = new UserProfileDto(user);
    }
}
