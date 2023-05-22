import "reflect-metadata";
import dotenv from "dotenv";
import express, { Application, urlencoded } from "express";
import _ from "lodash";
import AppDatasource from "./config/database";
// import { Routes } from "./routes";
import User from "./entity/user";

dotenv.config();

const PORT: number = _.toNumber(process.env.PORT) || 5000;

const app: Application = express();

AppDatasource.initialize()
  .then(async (res) => {
    app.use(express.json());
    app.use(urlencoded({ extended: false }));
    const userRepository = AppDatasource.getRepository(User);

    app
      .get("/", async (req, res): Promise<any> => {
        const user = await userRepository.find();
        res.status(200).json({
          message: "success",
          user,
        });
      })
      .post("/user", async (req, res): Promise<any> => {
        const { firstName, lastName, age } = req.body;

        const user: User = _.assign(new User(), {
          firstName,
          lastName,
          age,
        });

        const userInserted = await userRepository.save(user);
        res.status(200).json({
          message:"success",
          data:userInserted
        })
      });

    // Routes.forEach((route) => {
    //   (app as any)[route.method](
    //     route.route,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](
    //         req,
    //         res,
    //         next
    //       );
    //       if (result instanceof Promise) {
    //         result.then((result) =>
    //           result !== null && result !== undefined
    //             ? res.json({ data: result })
    //             : undefined
    //         );
    //       } else if (result !== null && result !== undefined) {
    //         res.json(result);
    //       }
    //     }
    //   );
    // });

    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
      console.log(`${res.isInitialized && "database connected successfully"}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
