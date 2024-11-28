const { people } = require("./people.cjs");
const {
  pokemon: { getPokemonById },
} = require("./entities/index.cjs");
const {
  logger: { configureLogger },
} = require("./plugins/index.cjs");

const logger = configureLogger("app");

logger.log(people);

// Fake error
logger.error({ person: people[people.length] });

getPokemonById(1)
  .then((result) => logger.log({ pokemon: result }))
  .catch(logger.error);
