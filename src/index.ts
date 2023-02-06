global.WebSocket = require("ws");
require("isomorphic-fetch");
import express from "express";
import http from "http";
const aws = require('aws-sdk')
const AWSAppSyncClient = require('aws-appsync').default
const gql = require('graphql-tag')
const bodyParser = require('body-parser');
const cors = require("cors");

const getRoomStatus = `
    subscription myQuery {
        addedRoomStatus(roomID: "hoge") {
            roomID
            roomStatus
        }
    }
`

const client = new AWSAppSyncClient({
  url: process.env.END_POINT,
  region: process.env.REGION,
  auth: {
    type: process.env.AUTH_TYPE,
    apiKey: process.env.API_KEY
  },
  disableOffline: true
})

aws.config.update({
  region: process.env.AWS_REGION
})

const PORT = 3000;
const app = express();

app.use(cors())
app.use(express.json({}));
app.use(express.urlencoded({
  extended: true
}));

app.post("/", async(req, res) => {
  console.log("try")

  const query = req.body.query || getRoomStatus;
  console.log(query)
  const queryParam = gql(query);
  const subscriptionClient = await client.hydrated()
    const observable = subscriptionClient.subscribe({ query: queryParam });
    const listener = observable.subscribe({
      next: (data: any) =>{
      listener.unsubscribe();
      res.status(200).send(data)
  },
      complete: console.log,
      error: (error:any) => {
        console.log("ERROR: ", error)
      }
    });
})

const server = http.createServer(app);

server.listen(PORT);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe "+addr : "port " + addr?.port;
  console.log("Listening on "+bind);
})