import * as esBuild from "esbuild";
import dotenv from "dotenv";

const env = dotenv.config({
  path: ".env"
}).parsed;


esBuild.build({
  entryPoints: ["./src/index.ts"],
  outfile: "./bin/index.js",
  platform: "node",
  bundle: true,
  define: {
    "process.env": JSON.stringify(env)
  }
}).then(() => {
  console.log("Build complete")
})