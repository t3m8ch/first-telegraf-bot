import { TodoEntity } from "../entities/todo.entity";
import { Connection, Repository } from "typeorm";

export interface CreatingTodoDTO {
  text: string;
  isCompleted: boolean;
}

export class TodoIsNotExists extends Error {
  constructor(public readonly todoId: number) {
    super(`Todo with ID: ${todoId} is not exists`);
  }
}

export class TodoService {
  constructor(private readonly dbConnection: Connection) {}

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
    await repo.remove(await getTodoById(todoId, repo));
  }

  async complete(todoId: number) {
    const repo = this.dbConnection.getRepository(TodoEntity);
    const todo = await getTodoById(todoId, repo);

    todo.isCompleted = true;
    await repo.save(todo);
  }
}

async function getTodoById(
  todoId: number,
  repo: Repository<TodoEntity>,
): Promise<TodoEntity> {
  const todo = await repo.findOne(todoId);

  if (todo === undefined) {
    throw new TodoIsNotExists(todoId);
  }

  return todo;
}
