import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
export declare class PostService {
    private readonly repoPost;
    constructor(repoPost: Repository<Post>);
    create(createPostDto: CreatePostDto, user: User): Promise<Post>;
    findAll(query?: string): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    findBySlug(slug: string): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<{
        success: boolean;
        post: Post;
    }>;
}
