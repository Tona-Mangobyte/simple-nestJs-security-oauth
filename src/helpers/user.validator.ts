import {InvalidUserException, UserInterface, UserValidatorInterface} from "nestjs-oauth2-server";
import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {UserService} from "../services/user.service";

@Injectable()
export class UserValidator implements UserValidatorInterface {
    @Inject(UserService)
    private readonly userService: UserService;

    async validate(username, password): Promise<UserInterface> {
        const user = await this.userService.findBbUsername(username);
        if (!user) {
            throw new NotFoundException('user not found!');
        }
        if (user.password !== password) {
            throw InvalidUserException.withUsernameAndPassword(username, password);
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }
}
