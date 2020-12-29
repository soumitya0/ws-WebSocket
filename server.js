const WebSocket = require("ws");

const webSocketServer = new WebSocket.Server({ port: 8080 }, () => {
  console.log("server running............");
});

webSocketServer.on("connection", (webSocket) => {
  // webSocket.on  This is the most important callback for us, we'll handle
  // all messages from users here.
  webSocket.on("message", (message) => {
    console.log("Received:", message);
    broadcast(message);
  });
});

function broadcast(data) {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
