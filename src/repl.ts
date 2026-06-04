import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State): void {
  state.rl.prompt();

  state.rl.on("line", async (line) => {
    const words = cleanInput(line);
      
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const command = state.commands[words[0]];

    if (!command) {
      console.log("Unknown command");
      state.rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...words.slice(1));
    } catch (err) {
      console.log(err);
    }

    state.rl.prompt();
  });
}