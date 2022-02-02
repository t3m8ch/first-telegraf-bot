import { Telegraf } from "telegraf";
import { setupTodoHandlers } from "../handlers/todo.handlers";
import { ExtendedContext } from "./extended-context.main";

export function setupHandlers(bot: Telegraf<ExtendedContext>) {
  setupTodoHandlers(bot);
}
