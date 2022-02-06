import { Context } from "telegraf";
import { TodoService } from "../services/todo.service";

export interface ExtendedContext extends Context {
  todoService: TodoService;
}
