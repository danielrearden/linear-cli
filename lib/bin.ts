#!/usr/bin/env node

import inquirer from "inquirer";
import inquirerAutoComplete from "inquirer-autocomplete-prompt";
import yargs from "yargs";
import {
  checkoutCommand,
  clearCommand,
  loginCommand,
  logoutCommand,
  newCommand,
  statusCommand,
} from "./commands";

inquirer.registerPrompt("autocomplete", inquirerAutoComplete);

yargs(process.argv.slice(2))
  .scriptName("linear")
  .command(...loginCommand)
  .command(...logoutCommand)
  .command(...newCommand)
  .command(...checkoutCommand)
  .command(...statusCommand)
  .command(...clearCommand)
  .completion("completion", "Generate completion script.")
  .help().argv;
