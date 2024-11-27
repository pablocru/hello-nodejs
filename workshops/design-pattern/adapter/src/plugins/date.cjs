const moment = require("moment");

/**
 * @param {string | undefined} strDate
 */
function getValidDate(strDate) {
  const momentDate = moment(strDate);

  if (!momentDate.isValid()) throw new Error("The date provided is invalid");

  return momentDate;
}

/**
 * @param {string} strDate
 */
function getLongDateFromString(strDate) {
  const momentDate = getValidDate(strDate);

  return momentDate.format("LL");
}

/**
 * @param {string} strDate
 */
function getYearDiffInNumber(strDate) {
  const momentDate = getValidDate(strDate);

  return moment().diff(momentDate, "y");
}

module.exports = {
  getLongDateFromString,
  getYearDiffInNumber,
};
