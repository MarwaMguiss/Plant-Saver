import { UserService } from './user.service';
import { UserLoginDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    userLogin(userLoginDto: UserLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    userRegistiration(userCreate: CreateUserDto): Promise<User>;
    auhStatus(user: User): {
        status: boolean;
        user: User;
    };
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
}
