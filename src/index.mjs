import Promise from "bluebird";

import packageJson from "../package.json";
import chopsticks from "chopsticks";
import globby from "globby";
import { resolve } from "url";

import Reporter from "eastern/src/reporter";
import Describe from "eastern/src/describe";
import usage from "./usage";

process.on("unhandledRejection", function(error, promise) {
  console.error(error.stack);
  process.exit(1);
});
(async () => {
  const args = chopsticks(process.argv.slice(2), {
    alias: {
      v: "version",
      h: "help"
    }
  });
  if (args.version) {
    console.log(packageJson.version);
    process.exit(0);
  }
  if (args.help) {
    usage();
    process.exit(0);
  }

  const globs = args._.length ? args._ : ["test.mjs", "test/**/*.mjs"];
  const paths = await globby(globs);

  const reporter = new Reporter();
  const root = new Describe(null, { reporter, immediate: false });

  global.spec = root.block;
  global.it = root.block;
  global.describe = root.block.describe;

  await Promise.each(paths, path => {
    return import(new URL(path, new URL(`file://${process.cwd()}/`)));
  });

  console.log("");
  root.evaluateBlock();

  await root.finish;
  if (!reporter.isComplete(root.count())) {
    reporter.outputResult();
    reporter.outputFailures();
    process.exit(1);
  }
  reporter.outputResult();
  console.log("");
})();
