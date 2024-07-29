"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Requires
var http = require("http");
var fs = require("fs");
//import server as WebSocketServer from "websocket";
// Information
// TODO: start storing info
// Serving contents and setup
var indexContents = fs.readFileSync("./index.html");
var httpServer = http.createServer(function (req, res) {
    // Write a response
    res.writeHead(200, { "Content-type": "text/html" });
    res.write(indexContents);
    res.end();
});
//const ws = new websocket::WebSocketServer({"httpServer":httpServer});
// Run
var PORT = 5005;
httpServer.listen(PORT, "127.0.0.1", function () { return console.log("Server is open on port : ".concat(PORT)); });
