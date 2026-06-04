import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache = new Cache(300_000); // 5 min TTL
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get(url);
        if (cached) {
            console.log("Cache hit!");
            return cached;
        }
        const res = await fetch(url);
        if (!res.ok)
            throw new Error(`Failed to fetch locations: ${res.status}`);
        const data = await res.json();
        this.cache.add(url, data);
        return data;
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get(url);
        if (cached) {
            console.log("Cache hit!");
            return cached;
        }
        const res = await fetch(url);
        if (!res.ok)
            throw new Error(`Failed to fetch location: ${res.status}`);
        const data = await res.json();
        this.cache.add(url, data);
        return data;
    }
    async fetchPokemon(pokemonName) {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.cache.get(url);
        if (cached)
            return cached;
        const res = await fetch(url);
        if (!res.ok)
            throw new Error(`Failed to fetch pokemon: ${res.status}`);
        const data = await res.json();
        this.cache.add(url, data);
        return data;
    }
}
