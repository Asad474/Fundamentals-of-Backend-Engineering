// Pub Sub with web sockets

const http = require("http");
const fs = require("fs");
const path = require("path");
const ws = require("ws");
const Redis = require("ioredis");

const redisPublisher = new Redis();
const redisSubscriber = new Redis();

const server = http.createServer((req, res) => {
  const htmlFilePath = path.join(__dirname, "index.html");
  fs.readFile(htmlFilePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error occurred while reading file.");
    }

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(data);
  });
});

const port = 8050;

const wsServer = new ws.Server({ server });

wsServer.on("connection", (client) => {
  console.log("Successfully connected to the client");

  client.on("message", (message) => {
    redisPublisher.publish("chat_messages", message);
  });

  redisSubscriber.subscribe("chat_messages");

  redisSubscriber.on("message", (channel, message) => {
    console.log("Redis", channel, message);
    for (const client of wsServer.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
