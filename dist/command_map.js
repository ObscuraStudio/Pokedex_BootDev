export async function commandMap(state) {
    const data = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
    for (const loc of data.results) {
        console.log(loc.name);
    }
}
export async function commandMapB(state) {
    if (!state.prevLocationsURL) {
        console.log("You're on the first page.");
        return;
    }
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
    for (const loc of data.results) {
        console.log(loc.name);
    }
}
