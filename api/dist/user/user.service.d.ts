import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly repo;
    private jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    login(loginDto: UserLoginDto): Promise<{
        token: string;
        user: User;
    }>;
    verifyPassword(password: string, hash: string): Promise<any>;
    register(createUser: CreateUserDto): Promise<User>;
}
