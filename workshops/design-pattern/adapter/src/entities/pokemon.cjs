const { httpClient } = require("../plugins/http-client.cjs");

/**
 * @param {number} id
 */
async function getPokemonById(id) {
  const API_URL = "https://pokeapi.co/api/v2/pokemon";

  const pokemon = await httpClient.get(`${API_URL}/${id}`);

  return pokemon.name;
}

module.exports = { getPokemonById };
