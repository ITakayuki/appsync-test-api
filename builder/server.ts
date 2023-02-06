import * as esBuild from "esbuild";
import dotenv from "dotenv";

const env = dotenv.config({
  path: ".env"
}).parsed;


esBuild.context({
  bundle: true,
  entryPoints: ["./src/index.ts"],
  outfile: "./bin/index.js",
  platform: "node",
  define: {
    "process.env": JSON.stringify(env)
  }
}).then(watcher => {
  watcher.watch().then(() => {
    console.log("watch start");
  })
});

