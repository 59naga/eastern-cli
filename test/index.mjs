import Promise from "bluebird";
import { deepEqual } from "assert-diff";
import chalk from "chalk";
import { runAsync, fetch } from "./helpers";

process.env.EASTERN_ENV = "test";

const passes = [];
const fails = [];

Promise.each(
  [
    [
      "should output result using global eastern",
      ["mixin/index.mjs"],
      "mixin/expected.mjs"
    ]
  ],
  async ([title, globs, expected]) => {
    try {
      deepEqual(await runAsync(globs), await fetch(expected));
      console.log("  " + chalk.green.underline(`✓ ${title}`));
      passes.push([title]);
    } catch (error) {
      console.log("  " + chalk.red.underline(`☓ ${title}`));
      fails.push([title, error]);
    }
  }
)
  .then(() => {
    if (fails.length) {
      console.warn();
      fails.map(([title, error]) => {
        console.log(chalk.red.underline(`☓ ${title}`));
        console.warn(`${chalk.red(error.message)}`);
      });
      process.exit(1);
    } else {
      console.log();
      console.log(chalk.green.underline(`${passes.length} specs all passed.`));
    }
  })
  .catch(error => {
    console.warn(error);
    process.exit(1);
  });
