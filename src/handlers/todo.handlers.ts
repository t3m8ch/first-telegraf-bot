import { Context, Telegraf } from "telegraf";
import { TodoIsNotExists, TodoService } from "../services/todo.service";
import { TodoEntity } from "../entities/todo.entity";

export function setupTodoHandlers(bot: Telegraf<Context>) {
  bot.command("add", async (ctx) => {
    const text = ctx.message?.text;
    const todoText = text?.split(" ").splice(1).join(" ");

    if (!todoText) {
      await ctx.reply("You must enter the todo text");
      return;
    }

    // @ts-ignore
    const todoService: TodoService = ctx.todoService;
    await todoService.add({ text: todoText, isCompleted: false });

    await ctx.reply(`The todo with the text "${todoText}" was successfully added`);
  });

  bot.command("getAll", async (ctx) => {
    // @ts-ignore
    const todoService: TodoService = ctx.todoService;

    const todos = await todoService.getAll();
    await ctx.reply(buildGetAllMessage(todos));
  });

  bot.command("remove", async (ctx) => {
    const text = ctx.message?.text;
    const todoIdString = text?.split(" ")[1];
    if (todoIdString === undefined) {
      await ctx.reply("You must enter the todo ID");
      return;
    }

    const todoId = parseInt(todoIdString);
    if (isNaN(todoId)) {
      await ctx.reply("The command argument must be a number");
      return;
    }

    // @ts-ignore
    const todoService: TodoService = ctx.todoService;

    try {
      await todoService.remove(todoId);
    } catch (e) {
      if (e instanceof TodoIsNotExists) {
        await ctx.reply(`Todo with ID: ${e.todoId} is not exists`);
        return;
      }
      throw e;
    }

    await ctx.reply(`Todo with ID: ${todoId} was successfully removed`);
  });
}

function buildGetAllMessage(todos: TodoEntity[]): string {
  if (!todos.length) {
    return "У вас нет задач :)";
  }

  return [
    "Ваши задачи:",
    ...todos.map((todo) => {
      const completedEmoji = todo.isCompleted ? " ✅" : "";
      return `${todo.id}. ${todo.text}${completedEmoji}`;
    }),
  ].join("\n");
}
