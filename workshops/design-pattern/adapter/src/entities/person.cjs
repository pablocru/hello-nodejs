/**
 * @typedef {Object} Person
 * @property {string} id
 * @property {string} name
 * @property {string} birthdate
 * @property {number} age
 */

/**
 * @callback GetIdentifier
 * @return {string}
 */

/**
 * @callback GetBirthday
 * @param {string} strBirthday
 * @return {string}
 */

/**
 * @callback GetAge
 * @param {string} strBirthday
 * @return {number}
 */

/**
 * @param {GetIdentifier} getIdentifier
 * @param {GetBirthday} getBirthday
 * @param {GetAge} getAge
 */
function configureMakePerson(getIdentifier, getBirthday, getAge) {
  /**
   * @param {string} name
   * @param {string} strBirthdate
   * @returns {Person}
   */
  function makePerson(name, strBirthdate) {
    return {
      id: getIdentifier(),
      age: getAge(strBirthdate),
      birthdate: getBirthday(strBirthdate),
      name,
    };
  }

  return makePerson;
}

module.exports = { configureMakePerson };
