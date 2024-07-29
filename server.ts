// Requires
import http = require("http");
import fs = require("fs");
import path = require("fs");
import websocket = require("websocket");
//import server as WebSocketServer from "websocket";

// Information
// TODO: start storing info

// Serving contents and setup
let indexContents: Buffer = fs.readFileSync("./index.html");
const httpServer = http.createServer(function (req, res) {
	// Write a response
	res.writeHead(200, { "Content-type": "text/html" });
	res.write(indexContents);
	res.end();
})
//const ws = new websocket::WebSocketServer({"httpServer":httpServer});

// Run
const PORT = 5005;
httpServer.listen(PORT, "127.0.0.1", () => console.log(`Server is open on port : ${PORT}`));

