export async function commandPokedex(state) {
    console.log("Your Pokedex:");
    for (const name of Object.keys(state.pokedex)) {
        console.log(` - ${name}`);
    }
}
