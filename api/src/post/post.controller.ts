import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseInterceptors, ClassSerializerInterceptor, ValidationPipe, Req, Query, UseGuards, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Express, Request } from 'express';
import { CurrentUser } from 'src/auth/user.decorator';
import { CurrentUserGuard } from 'src/auth/current-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ACGuard, UseRoles } from 'nest-access-control';


@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'create',
    resource: 'posts'
  })
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request|any, @CurrentUser() user: User ) {
    console.log(user);
    return this.postService.create(createPostDto, req.user as User);
  }

  @Get()
  @UseGuards(CurrentUserGuard)
  findAll(@Query() query: any, @Req() req: Request, @CurrentUser() user: User) {
    console.log(user);
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb)=> {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split(".")[1];
        const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
         
        cb(null, newFileName);
      }
    }),
    fileFilter: (req, file, cb) =>{
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb (null, false);
      }
      cb (null , true);
    }
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      const response = {
        filePath: `http://localhost:3000/post/pictures/${file.filename}`
      };
      return response;
    }
  }
  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename, @Res() res: Response | any){
    res.sendFile(filename, {root: './uploads'});
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'update',
    resource: 'posts'
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'delete',
    resource: 'posts'
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
