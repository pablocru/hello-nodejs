const {
  person: { configureMakePerson },
} = require("./entities/index.cjs");
const {
  date: { getLongDateFromString, getYearDiffInNumber },
  identifier: { getIdentifier },
} = require("./plugins/index.cjs");

// Dependency injection
const makePerson = configureMakePerson(
  getIdentifier,
  getLongDateFromString,
  getYearDiffInNumber
);

/** @type {import("./entities/person.cjs").Person[]} */
const people = [
  makePerson("Pablo", "1996-06-28"),
  makePerson("Miguel", "2002-03-14"),
];

module.exports = {
  people,
};
