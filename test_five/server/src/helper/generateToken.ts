import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entity";
import configs from "../config/constants";

export const generateAccessToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    configs.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (user: User) => {
  return sign(
    {
      userId: user.id,
      tokenVersion: user.token_version,
    },
    configs.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie(configs.JWT_COOKIE, refreshToken, {
    httpOnly: true,
  });
};
