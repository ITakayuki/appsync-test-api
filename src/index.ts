import express from "express";
import http from "http";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!\n")
})

const server = http.createServer(app);

server.listen(PORT);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe "+addr : "port " + addr?.port;
  console.log("Listening on "+bind);
})