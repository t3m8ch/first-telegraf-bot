import { Context, Telegraf } from "telegraf";
import { setupTodoHandlers } from "../handlers/todo.handlers";

export function setupHandlers(bot: Telegraf<Context>) {
  setupTodoHandlers(bot);
}
