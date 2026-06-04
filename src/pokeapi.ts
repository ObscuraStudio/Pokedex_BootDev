import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache = new Cache(300_000); // 5 min TTL

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("Cache hit!");
      return cached;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
    const data = await res.json() as ShallowLocations;
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get<Location>(url);
    if (cached) {
      console.log("Cache hit!");
      return cached;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch location: ${res.status}`);
    const data = await res.json() as Location;
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
  const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
  const cached = this.cache.get<Pokemon>(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch pokemon: ${res.status}`);
  const data = await res.json() as Pokemon;
  this.cache.add(url, data);
  return data;
}
  
}
export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  id: number;
  name: string;
  areas: { name: string; url: string }[];
  pokemon_encounters: {
    pokemon: { name: string; url: string };
  }[];
  
};
export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
};