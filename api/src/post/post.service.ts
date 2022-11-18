import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly repoPost: Repository<Post>
  ){}
  async create(createPostDto: CreatePostDto, user: User) {
    //const slug = createPostDto.title.split(" ").join('_').toLowerCase();
    console.log(createPostDto);

    const post = new Post();
    post.userId = 3 ;
    Object.assign(post, createPostDto);
    this.repoPost.create(post);
    return await this.repoPost.save(post);
  }

  // http://localhost:3000/post?sort=asc&title=Traveluredupommier
  async findAll(query?: string) {
    const myQuery = 
    this.repoPost.createQueryBuilder("post")
    .leftJoinAndSelect("post.category", "category")
    .leftJoinAndSelect("post.user", "user");

    //check if queryis present or not
    if(!(Object.keys(query).length === 0)&& query.constructor === Object){
      const queryKeys = Object.keys(query); 
      //get the keys of the query string
      //check if title key is present
      if(queryKeys.includes('title')) {
        myQuery.where('post.title LIKE :title', {title: `%${query['title']}%`});
      }
      if(queryKeys.includes('sort')) {
        myQuery.orderBy('post.title',query['sort'].toUpperCase());
      }
      if(queryKeys.includes('category')){
        myQuery.andWhere('category.title = :cat', {cat: query['category']});
      }
      return await myQuery.getMany();
    } else {
      return await myQuery.getMany();
    }
  }

  async findOne(id: number) {
    const post= await this.repoPost.findOneBy({id});
    if(!post){
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async findBySlug(slug: string){
    try {
      const post = await this.repoPost.findOneByOrFail({slug})
      return post;
    } catch (err){
      throw new BadRequestException( `Post with ${slug} not found`);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.repoPost.findOneBy({id});
    if(!post){
      throw new BadRequestException('Post not found');
    }
    post.modifiedOn = new Date(Date.now());
    post.category = updatePostDto.category;

    Object.assign(post, updatePostDto);
    return this.repoPost.save(post);
  }

  async remove(id: number) {
    const post = await this.repoPost.findOneBy({id});
    if(!post){
      throw new BadRequestException('Post not found');
    }
    await this.repoPost.remove(post);
    return {success: true, post};
  }
}
