// Requires
//import http = require("http");
import * as http from "http";
//import fs = require("fs");
import * as fs from "fs";
//import path = require("fs");
//import websocket = require("websocket");
//import * as mywasm from "./wasm_modules/pkg"; // Include final `/`?
//import server as WebSocketServer from "websocket";
// Needed this to be the JS for node to be happy:
//var mywasm = import("./wasm_modules/pkg/wasm_modules");

// Information
// TODO: start storing info

// Serving contents and setup
let indexContents: string = fs.readFileSync("./index.html", "utf8");
const httpServer = http.createServer(function (req, res) {
	// Write a response
	res.writeHead(200, { "Content-type": "text/html" });
	res.write(indexContents);
	res.end();
})
//const ws = new websocket::WebSocketServer({"httpServer":httpServer});

// Test WASM
// TODO: make WASM work with node
//console.log("WASM check: 3 + 4 = " + mywasm.add(3, 4));

// Run
const PORT: number = 5005;
httpServer.listen(PORT, "127.0.0.1", () => console.log(`Server is open on port : ${PORT}`));

