import * as tt from "telegraf/typings/telegram-types";
import { Telegram } from "telegraf/typings/telegram";
import { Context } from "telegraf";
import { TodoService } from "../services/todo.service";

export class ExtendedContext extends Context {
  todoService: TodoService

  constructor(
    update: tt.Update,
    telegram: Telegram,
    options?: {
      username?: string;
      channelMode?: boolean;
    },
  ) {
    super(update, telegram, options);
  }
}
