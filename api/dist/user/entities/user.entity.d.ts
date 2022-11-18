import { Post } from "src/post/entities/post.entity";
import { UserRoles } from "src/auth/user-roles";
export declare class User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    phone: number;
    profilePic: string;
    roles: UserRoles;
    posts: Post[];
    hashPassword(): void;
}
