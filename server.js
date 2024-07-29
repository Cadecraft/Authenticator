const http = require("http");
const fs = require("fs");
const path = require("fs");
const WebSocketServer = require("websocket").server;
var sids = [];
var clients = {};
let indexContents = fs.readFileSync("./index.html");
const httpServer = http.createServer(function (req, res) {
	// Write a response
	res.writeHeader(200, { "Content-type": "text/html" });
	res.write(indexContents);
	res.end();
})
const ws = new WebSocketServer({"httpServer":httpServer});
const PORT = 5005;
httpServer.listen(PORT, "127.0.0.1", () => console.log(`Server is open on port : ${PORT}`));
