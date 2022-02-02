import "reflect-metadata";
import { Telegraf } from "telegraf";
import { loadConfigFromEnv } from "./main/config.main";
import { TodoService } from "./services/todo.service";
import { initDB } from "./main/database.main";
import { setupHandlers } from "./main/handlers.main";
import { ExtendedContext } from "./main/extended-context.main";

async function start() {
  const config = loadConfigFromEnv();
  const bot = new Telegraf(config.botToken, {
    // @ts-ignore
    contextType: ExtendedContext,
  });

  const dbConnection = await initDB(config);

  // @ts-ignore
  bot.context.todoService = new TodoService(dbConnection);

  // @ts-ignore
  setupHandlers(bot);

  bot.launch().then(() => console.log("Bot is started!"));

  process.once("SIGINT", () => bot.stop());
  process.once("SIGTERM", () => bot.stop());
}

start().then();
