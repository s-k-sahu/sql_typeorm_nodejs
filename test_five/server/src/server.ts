import "reflect-metadata";
import "colors.ts";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import AppDataSource from "./config/database";
import apolloServer from "./graphql/apolloServer";

AppDataSource.initialize()
  .then(async (data) => {
    const app: Application = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
      credentials:true,
      origin: 'http://localhost:3000',
    }));
    app.use(morgan("dev"));
    if (data?.isInitialized) {
      console.log(`🚀 database connected successfully`.green);
      await apolloServer(app);
    }
  })
  .catch((error) => console.log(error));
