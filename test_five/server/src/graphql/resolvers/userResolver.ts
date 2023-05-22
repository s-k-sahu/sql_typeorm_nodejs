import { compare, hash } from "bcryptjs";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Response, Request } from "express";
import { GraphQLError } from "graphql";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { User } from "../../entity";
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "../../helper/generateToken";

export interface MyContext {
  res: Response;
  req: Request;
  tokenPayload?: {
    userId: string;
    tokenVersion?: number;
  };
}

@ObjectType()
class LoginResponse {
  @Field(() => String)
  access_token: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello WORLD";
  }

  @Mutation(() => Boolean)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const findUser = await User.findOne({ where: { email } });
      if (findUser) throw new Error("User with that email is already exist");

      await User.insert({
        email,
        password: await hash(password, 12),
        username: email.split("@")[0],
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User with that email is doesn't exist");

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid)
        throw new GraphQLError("password is invalid", {
          extensions: {
            code: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            http: { status: StatusCodes.INTERNAL_SERVER_ERROR },
          },
        });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      sendRefreshToken(res, refreshToken);
      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
