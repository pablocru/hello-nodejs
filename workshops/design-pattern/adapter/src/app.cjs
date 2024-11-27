const { people } = require("./people.cjs");
const { getPokemonById } = require("./entities/pokemon.cjs");

console.log(people);

getPokemonById(1)
  .then((result) => console.log({ pokemon: result }))
  .catch(console.error);
