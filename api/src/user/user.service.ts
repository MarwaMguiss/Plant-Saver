import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private jwtService : JwtService
  ){}
  async login(loginDto: UserLoginDto){
    console.log(loginDto);
    const user = await 
    this.repo.createQueryBuilder('user')
    .addSelect('user.password')
    .where("user.email = :email", { email: loginDto.email}).getOne();
    console.log(user);
    if(!user){
      throw new UnauthorizedException('Bad credentials - user not found');
    }else {
      // verify that the password hash is matching with the password hash in database
      if(await this.verifyPassword(loginDto.password, user.password)){
        const token = await this.jwtService.signAsync({
          email: user.email,
          id: user.id
        });
        delete user.password;
        return { token, user};
      } else {
        throw new UnauthorizedException('Bad credentials - pass mismatch');
      }
    }
  }

  async verifyPassword(password: string, hash: string){
    return await bcrypt.compare(password, hash);
  }

  async register(createUser: CreateUserDto){
    const {email} =  createUser;
    const checkForUser = await this.repo.findOneBy({email});
    if (checkForUser){
      throw new BadRequestException('Email is already chosen, please choose a new one');
    }else {
      const user = new User();
      Object.assign(user, createUser);
      await this.repo.save(user);
      delete user.password;
      return user;
    }
  }
}
