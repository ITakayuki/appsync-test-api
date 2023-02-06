import * as esBuild from "esbuild";

esBuild.build({
  entryPoints: ["./src/index.ts"],
  outfile: "./bin/index.js",
  platform: "node",
  bundle: true,
}).then(() => {
  console.log("Build complete")
})