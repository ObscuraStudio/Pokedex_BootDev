import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: { name: "help", description: "Displays a help message", callback: commandHelp },
    exit: { name: "exit", description: "Exit the Pokedex", callback: commandExit },
    map: { name: "map", description: "Display next 20 location areas", callback: commandMap },
    mapb: { name: "mapb", description: "Display previous 20 location areas", callback: commandMapB },
    explore: { name: "explore", description: "Explore a location area for Pokemon", callback: commandExplore, },
    catch: { name: "catch", description: "Attempt to catch a Pokemon", callback: commandCatch, },
    inspect: {
  name: "inspect",
  description: "Inspect a caught Pokemon",
  callback: commandInspect,
},
pokedex: {
  name: "pokedex",
  description: "List all caught Pokemon",
  callback: commandPokedex,
},
  };
}