import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/database";
import User from "../entity/user";
import _ from "lodash";

export default class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;

    const user = _.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userRepository.save(user);
  }
}