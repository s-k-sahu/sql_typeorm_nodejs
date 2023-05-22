import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import _ from "lodash";
import db from "../models";

const app: Application = express();
const PORT: number = _.toNumber(process.env.PORT) || 4000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("server is started");
  });
});
