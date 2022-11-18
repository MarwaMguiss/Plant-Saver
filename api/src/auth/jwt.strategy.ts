import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { Request } from "express";
import { validate } from "class-validator";


export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) 
        private readonly repo: Repository<User>
    ){
        super({
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }])
        });
    }
    async validate(payload: any, req: Request){
        if(!payload) {
            throw new UnauthorizedException();
        }
        const user = await this.repo.findOneBy({email: payload.email});
        if(!user){
            throw new UnauthorizedException();
        }
        req.user = user;
        return req.user;
    }
}

