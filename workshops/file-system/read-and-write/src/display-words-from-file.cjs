const fs = require("fs");
const { DEFAULT_ENCODING, REACT_FILE_PATH } = require("./config.cjs");

const data = fs.readFileSync(REACT_FILE_PATH, DEFAULT_ENCODING);

const wordList = data.split(/\s+/);
console.log("Original File Word List:", wordList);

const reactWordList = data.match(/React/gi) ?? [];
console.log("React Word List:", reactWordList);
