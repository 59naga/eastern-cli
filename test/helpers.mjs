import Promise from "bluebird";
import { spawn } from "child_process";
import { dirname } from "path";
import { resolve } from "url";

const cwd = dirname(import.meta.url.slice("file://".length));

export function runAsync(globs) {
  return new Promise(resolve => {
    const child = spawn("node", ["../eastern", ...globs], { cwd });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", data => (stdout += data.toString()));
    child.stderr.on("data", data => (stderr += data.toString()));
    child.on("exit", code => {
      resolve({ code, stdout, stderr });
    });
  });
}

export function fetch(file) {
  return import(resolve(`${cwd}/`, file));
}
