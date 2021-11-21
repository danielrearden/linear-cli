import chalk from "chalk";
import { cache } from "../cache";
import { getCacheDir } from "../routines";

export const clearCommand = [
  "clear",
  `Clear the cache. This should be done when there are changes to your Linear settings. Cache directory:\n${getCacheDir()}\n`,
  {},
  async () => {
    cache.destroy();
    console.log(chalk.green("The cache has been cleared."));
  },
] as const;
