export async function commandCatch(state, ...args) {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("Usage: catch <pokemon_name>");
        return;
    }
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    // higher base_experience = harder to catch
    const catchChance = 1 / (pokemon.base_experience / 50);
    const caught = Math.random() < catchChance;
    if (caught) {
        console.log(`${pokemonName} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.pokedex[pokemonName] = pokemon;
    }
    else {
        console.log(`${pokemonName} escaped!`);
    }
}
