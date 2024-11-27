const fs = require("fs");
const { resolve } = require("path");
const { DEFAULT_ENCODING, REACT_FILE_PATH } = require("./config.cjs");

const VUE_FILE_PATH = resolve(__dirname, "README-vue.md");

const data = fs.readFileSync(REACT_FILE_PATH, DEFAULT_ENCODING);

const newData = data.replace(/React/gi, "Vue");

fs.writeFileSync(VUE_FILE_PATH, newData, {
  encoding: DEFAULT_ENCODING,
});
