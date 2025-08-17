import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserDocument } from '../entities/user.entity';
import { Types } from 'mongoose';

export class RegisterResponseDto {
    @IsNotEmpty()
    id: Types.ObjectId;

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    constructor(user: UserDocument) {
        this.id = user._id as Types.ObjectId;
        this.username = user.username;
        this.email = user.email;
    }
}
