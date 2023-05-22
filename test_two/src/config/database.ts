import { DataSource } from "typeorm";
import User from "../entity/user";

// !postgres connection
// const AppDatasource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "admin",
//   database: "node_typescript_typeorm",
//   synchronize: true,
//   logging: true,
//   entities: [User],
//   migrations: [],
//   subscribers: [],
// });

const AppDatasource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "ashoksahu$955902",
  database: "node_typeorm_typescript",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export default AppDatasource;
