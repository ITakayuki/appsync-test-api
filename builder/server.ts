import * as esBuild from "esbuild";

esBuild.context({
  bundle: true,
  entryPoints: ["./src/index.ts"],
  outfile: "./bin/index.js",
  platform: "node",
}).then(watcher => {
  watcher.watch().then(() => {
    console.log("watch start");
  })
});

