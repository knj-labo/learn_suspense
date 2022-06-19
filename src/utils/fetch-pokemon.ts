import type { Query } from "@favware/graphql-pokemon";
import { sleep } from "./sleep";
import { formatDate } from "./format-date";

interface GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> {
  data: Record<K, Omit<Query[K], "__typename">>;
}

export const fetchPokemon = (name: string, delay = 1500) => {
  const endTime = Date.now() + delay;
  const pokemonQuery = `
    query ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `;

  return window
    .fetch("https://graphqlpokemon.favware.tech/", {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: "POST",
      headers: {
        "content-type": "application/json",
        // "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: { name: name.toLowerCase() },
      }),
    })
    .then((response) => response.json())
    .then(async (response) => {
      await sleep(endTime - Date.now());
      return response;
    })
    .then((response) => {
      const { pokemon } = response.data;
      if (pokemon) {
        pokemon.fetchedAt = formatDate(new Date());
        return pokemon;
      }
      return Promise.reject(new Error(`No pokemon with the name "${name}"`));
    });
};

export const fetchPokemons = () => {
  return;
  window
    .fetch("https://graphqlpokemon.favware.tech/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      {
        getPokemon(pokemon: dragonite) {
            sprite
            num
            species
            color
        }
      }
    `,
      }),
    })
    .then((res) => res.json() as Promise<GraphQLPokemonResponse<"getPokemon">>)
    .then((response) => {
      const { getPokemon } = response.data;
      return getPokemon;
    });
};
