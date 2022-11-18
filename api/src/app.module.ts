import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user-roles';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'marwa',
      database: 'plante',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    PostModule,
    CategoryModule,
    AccessControlModule.forRoles(roles)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
