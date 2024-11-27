const { v7 } = require("uuid");

function getIdentifier() {
  return v7();
}

module.exports = {
  getIdentifier,
};
