# Pokedex CLI

A terminal-based Pokedex built with TypeScript and Node.js. Explore location areas, catch Pokemon, and build your collection — all from the command line.

## Features

- Browse Pokemon location areas with pagination
- Explore areas to see which Pokemon inhabit them
- Attempt to catch Pokemon (harder ones are harder to catch)
- Inspect caught Pokemon for detailed stats
- View your full Pokedex collection
- Response caching to avoid redundant API calls

## Tech Stack

- TypeScript (ESM, strict mode)
- Node.js `readline` for the interactive REPL
- [PokéAPI](https://pokeapi.co/) for Pokemon data
- Vitest for unit testing

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/ObscuraStudio/pokedex
cd pokedex
npm install
```

### Run

```bash
npm run dev
```

### Build & Start

```bash
npm run build
npm start
```

### Tests

```bash
npm test
```

## Commands

| Command | Arguments | Description |
|---|---|---|
| `help` | — | Lists all available commands |
| `map` | — | Display the next 20 location areas |
| `mapb` | — | Display the previous 20 location areas |
| `explore` | `<area>` | List all Pokemon in a location area |
| `catch` | `<pokemon>` | Attempt to catch a Pokemon |
| `inspect` | `<pokemon>` | View stats of a caught Pokemon |
| `pokedex` | — | List all caught Pokemon |
| `exit` | — | Exit the Pokedex |

## Example Session

```
> map
canalave-city-area
eterna-city-area
pastoria-city-area
...

> explore pastoria-city-area
Exploring pastoria-city-area...
Found Pokemon:
 - tentacool
 - magikarp
 - gyarados

> catch magikarp
Throwing a Pokeball at magikarp...
magikarp was caught!
You may now inspect it with the inspect command.

> inspect magikarp
Name: magikarp
Height: 9
Weight: 100
Stats:
 -hp: 20
 -attack: 10
 -defense: 55
 -special-attack: 15
 -special-defense: 20
 -speed: 80
Types:
 - water

> pokedex
Your Pokedex:
 - magikarp
```

## Architecture

The project is structured around a central `State` object passed through all command callbacks:

- `state.ts` — State type, `CLICommand` type, and `initState()`
- `repl.ts` — REPL loop, input parsing, command dispatch
- `commands.ts` — Command registry
- `pokeapi.ts` — API client with built-in caching
- `pokecache.ts` — Generic TTL cache with a background reap loop
- `command_*.ts` — One file per command handler
