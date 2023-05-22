import _ from "lodash";
import dotenv from "dotenv";
dotenv.config();

const configs = {
  PORT: _.toNumber(process.env.PORT),
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: _.toNumber(process.env.DB_PORT),
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  JWT_COOKIE: _.toString(process.env.JWT_COOKIE),
};

export default configs;
