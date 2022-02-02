import "dotenv/config";
import { DBConfig } from "./database.main";

export interface ConfigMain extends DBConfig {
  botToken: string;
}

export function loadConfigFromEnv(): ConfigMain {
  const botToken = getEnvVar("BOT_TOKEN");
  const pathToDB = getEnvVar("PATH_TO_DB");

  return { botToken, pathToDB };
}

function getEnvVar(name: string): string {
  const envVar = process.env[name];

  if (envVar === undefined) {
    throw new Error(`You must provide a ${name} environment variable`);
  }

  return envVar;
}
