import { TodoEntity } from "../entities/todo.entity";
import { Connection } from "typeorm";

export interface CreatingTodoDTO {
  text: string;
  isCompleted: boolean;
}

export class TodoService {
  constructor(private readonly dbConnection: Connection) {
  }

  async add(todo: CreatingTodoDTO): Promise<TodoEntity> {
    const repo = this.dbConnection.getRepository(TodoEntity);

    const todoEntity = repo.create(todo);
    await repo.save(todoEntity);

    return todoEntity;
  }

  async getAll(): Promise<TodoEntity[]> {
    const repo = this.dbConnection.getRepository(TodoEntity);
    return await repo.find();
  }

  async remove(todoId: number) {
    const repo = this.dbConnection.getRepository(TodoEntity);
    await repo.delete(todoId);
  }
}
