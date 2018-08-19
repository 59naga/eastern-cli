import chalk from "chalk";
import packageJson from "../package.json";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";

const logo = readFileSync(
  resolve(dirname(import.meta.url.slice("file://".length)), "logo.txt"),
  "utf8"
);
const width = "                              ";
const usage = `
Usage: eatern [globs...] [options]

  Options:

    -v, --version
     output the version number
`;

export default () => {
  console.log(chalk.bgYellow(chalk.gray(logo)));
  console.log((width + `v${packageJson.version}`).slice(-30));
  console.log(usage);
};
