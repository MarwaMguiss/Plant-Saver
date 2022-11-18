import { Post } from "src/post/entities/post.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude } from "class-transformer";
import { UserRoles } from "src/auth/user-roles";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column({select: false})
    password: string;
    @Column()
    phone: number;
    @Column()
    profilePic: string;

    @Column({type: 'enum', enum: UserRoles, default: UserRoles.Reader})
    roles: UserRoles;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @BeforeInsert()
    hashPassword(): void{
        this.password = bcrypt.hashSync(this.password,10);
    }
}
 