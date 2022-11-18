/// <reference types="multer" />
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';
import { Request } from 'express';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, req: Request | any, user: User): Promise<import("./entities/post.entity").Post>;
    findAll(query: any, req: Request, user: User): Promise<import("./entities/post.entity").Post[]>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    findBySlug(slug: string): Promise<import("./entities/post.entity").Post>;
    uploadPhoto(file: Express.Multer.File): {
        filePath: string;
    };
    getPicture(filename: any, res: Response | any): Promise<void>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<{
        success: boolean;
        post: import("./entities/post.entity").Post;
    }>;
}
