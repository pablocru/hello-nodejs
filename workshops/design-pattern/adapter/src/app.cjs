const { people } = require("./people.cjs");
const { getPokemonById } = require("./entities/pokemon.cjs");
const configureLogger = require("./plugins/logger.cjs");

const logger = configureLogger("app");

logger.log(people);

// Fake error
logger.error({ person: people[people.length] });

getPokemonById(1)
  .then((result) => logger.log({ pokemon: result }))
  .catch(logger.error);
