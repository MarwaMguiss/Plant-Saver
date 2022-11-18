import { Controller, Post, Body, Res, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from './entities/user.entity';
import { CurrentUserGuard } from 'src/auth/current-user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto, @Res() res: Response){
    const { token, user} = await this.userService.login(userLoginDto);

    res.cookie ('IsAuthenticated',true, {maxAge: 2*60*60*1000})
    res.cookie ('Authentication', token,{
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    });
    return res.send({success: true, user});
  }

  @Post('register')
 async userRegistiration(@Body() userCreate: CreateUserDto){
  return this.userService.register(userCreate);
 }

 // Route to return current authentication state
 @Get('authstatus')
 @UseGuards(CurrentUserGuard)
 auhStatus(@CurrentUser() user: User) {
  return { status: !!user, user};
 }

 // Route to logout the user
 @Post('logout')
 logout(@Req() req: Request, @Res() res: Response){
  res.clearCookie("Authentication");
  res.clearCookie("IsAuthenticated");
  return res.status(200).send({success: true});
 }
}
