import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { base, fileDestination, fileName, limit, showTable } = yargs(
  hideBin(process.argv)
)
  .options({
    base: {
      alias: "b",
      type: "number",
      demandOption: true,
      describe: "Multiplication table base",
    },
    limit: {
      alias: "l",
      type: "number",
      default: 10,
      describe: "Multiplication table limit (included)",
    },
    ["show-table"]: {
      alias: "s",
      type: "boolean",
      default: false,
      describe: "Show multiplication table",
    },
    ["file-name"]: {
      alias: "n",
      type: "string",
      default: "table.txt",
      describe: "Output file name",
    },
    ["file-destination"]: {
      alias: "d",
      type: "string",
      default: "",
      describe: "Output file destination inside `output/`",
    },
  })
  .check(({ base }) => {
    if (base < 1) throw "Base must be grater than 0";

    return true;
  })
  .parseSync();

export default { base, fileDestination, fileName, limit, showTable };
