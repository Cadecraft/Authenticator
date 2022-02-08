const http = require("http");
const WebSocketServer = require("websocket").server;
var sids = [];
var clients = {};
const httpServer = http.createServer()
const ws = new WebSocketServer({"httpServer":httpServer});
const PORT = 5005;
httpServer.listen(PORT, "127.0.0.1", () => console.log(`Server is open on port : ${PORT}`));