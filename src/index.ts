import "reflect-metadata";
import { Telegraf } from "telegraf";
import { loadConfigFromEnv } from "./main/config.main";
import { TodoService } from "./services/todo.service";
import { initDB } from "./main/database.main";
import { setupHandlers } from "./main/handlers.main";
import { ExtendedContext } from "./main/extended-context.main";

async function start() {
  const config = loadConfigFromEnv();
  const bot = new Telegraf<ExtendedContext>(config.botToken);

  const dbConnection = await initDB(config);

  bot.context.todoService = new TodoService(dbConnection);

  setupHandlers(bot);

  bot.launch().then(() => console.log("Bot is started!"));

  process.once("SIGINT", () => bot.stop());
  process.once("SIGTERM", () => bot.stop());
}

start().then();
