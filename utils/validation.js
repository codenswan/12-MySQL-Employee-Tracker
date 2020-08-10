/**
 * THis validates answers
 * @param {string} answer this is a validation to make sure response is a string that starts with a capital letter
 */
const stringCapital = (capital) => {
  let valid = /^[A-Z](?!\s)[a-z]*((\W)?[A-Z][a-z]+)*$/.test(capital);
  return (
    valid ||
    "!    Please provide an answer. Make sure the name begins with a capitals."
  );
};

/**
 * THis validates answers
 * @param {string} string this is a validation to make sure response is a string
 */
const string = (string) => {
  let valid = /[a-z]/.test(string);
  return valid || "!    Please provide an answer.";
};

/**
 * THis validates answers
 * @param {Number} number this is a validation to make sure response is number
 */
const number = (number) => {
  let valid = !isNaN(parseFloat(number));
  return valid || "!    Please enter a number.";
};

module.exports = { number, string, stringCapital };