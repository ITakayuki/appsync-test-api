global.WebSocket = require("ws");
require("isomorphic-fetch");
const aws = require('aws-sdk')
const AWSAppSyncClient = require('aws-appsync').default
const gql = require('graphql-tag')

const env = require("dotenv").config({
  path: ".env"
}).parsed

const getRoomStatus = `
    subscription myQuery {
        addedRoomStatus(roomID: "hoge") {
            roomID
            roomStatus
        }
    }
`
const client = new AWSAppSyncClient({
  url: env.END_POINT,
  region: env.REGION,
  auth: {
    type: env.AUTH_TYPE,
    apiKey: env.API_KEY
  },
  disableOffline: true
})

aws.config.update({
  region: env.AWS_REGION
})

client.hydrated().then((client) => {
  const observable = client.subscribe({ query: gql(getRoomStatus) });
  const realtimeResults = function realtimeResults(data) {
    console.log(data)
    // res.status(200).send(data)
  };
  observable.subscribe({
    next: realtimeResults,
    complete: console.log,
    error: (error) => {
      console.log("ERROR: ", error)
    }
  });
})