import { sleep } from "./sleep";
import { formatDate } from "./format-date";

function fetchPokemon(name: string, delay = 1500) {
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
    .fetch("https://graphql-pokemon.now.sh", {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
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
}
