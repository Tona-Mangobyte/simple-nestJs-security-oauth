import {InvalidUserException, UserInterface, UserLoaderInterface} from "nestjs-oauth2-server";
import {UserService} from "../services/user.service";
import {Inject, Injectable} from "@nestjs/common";

@Injectable()
export class UserLoader implements UserLoaderInterface {
    @Inject(UserService)
    private readonly userService: UserService;
    async load(userId: string): Promise<UserInterface> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw InvalidUserException.withId(userId)
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    }
}
