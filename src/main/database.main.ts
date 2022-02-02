import { Connection, createConnection } from "typeorm";
import { TodoEntity } from "../entities/todo.entity";

export interface DBConfig {
  pathToDB: string;
}

export async function initDB(config: DBConfig): Promise<Connection> {
  return await createConnection({
    type: "sqlite",
    database: config.pathToDB,
    synchronize: true,
    entities: [TodoEntity],
  });
}
