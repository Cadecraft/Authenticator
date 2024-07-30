"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Requires
//import http = require("http");
var http = require("http");
//import fs = require("fs");
var fs = require("fs");
//import path = require("fs");
//import websocket = require("websocket");
//import * as mywasm from "./wasm_modules/pkg"; // Include final `/`?
//import server as WebSocketServer from "websocket";
// Needed this to be the JS for node to be happy:
//var mywasm = import("./wasm_modules/pkg/wasm_modules");
// Information
// TODO: start storing info
// Serving contents and setup
var indexContents = fs.readFileSync("./index.html", "utf8");
var httpServer = http.createServer(function (req, res) {
    // Write a response
    res.writeHead(200, { "Content-type": "text/html" });
    res.write(indexContents);
    res.end();
});
//const ws = new websocket::WebSocketServer({"httpServer":httpServer});
// Test WASM
// TODO: make WASM work with node
//console.log("WASM check: 3 + 4 = " + mywasm.add(3, 4));
var wasmBuffer = fs.readFileSync('./wasm_modules/pkg/wasm_modules_bg.wasm');
WebAssembly.instantiate(wasmBuffer).then(function (wasmModule) {
    // Exported function live under instance.exports
    var add = wasmModule.instance.exports.add;
    var sum = add(5, 6);
    console.log("Testing WASM: " + sum); // Outputs 11
});
// Run
var PORT = 5005;
httpServer.listen(PORT, "127.0.0.1", function () { return console.log("Server is open on port : ".concat(PORT)); });
