import Promise from "bluebird";

import packageJson from "../package.json";
import chopsticks from "chopsticks";
import globby from "globby";
import { resolve } from "url";

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
  const { default: it, describe } = await import("eastern");

  global.spec = it;
  global.it = it;
  global.describe = describe;

  Promise.each(paths, path => {
    return import(new URL(path, new URL(`file://${process.cwd()}/`)));
  });
})();
