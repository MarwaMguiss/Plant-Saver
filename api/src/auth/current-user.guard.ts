import { AuthGuard } from "@nestjs/passport";
import { realpathSync } from "fs";

export class CurrentUserGuard extends AuthGuard('jwt'){
    handleRequest(err: any, user: any) {
        if (user) return user;
        return null;
    }
}

