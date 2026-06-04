import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    pokedex: { }
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
    });
    return {
        rl,
        commands: getCommands(),
        pokeapi: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {},
    };
}
