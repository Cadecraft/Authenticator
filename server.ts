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
	console.log(req.method + " request was made");
	if (req.method == "POST") {
		// Post
		// Get the actual body
		let bodyArr = [];
		req.on("data", chunk => {
			bodyArr.push(chunk);
		}).on("end", () => {
			let body = JSON.parse(Buffer.concat(bodyArr).toString());
			// At this point, `body` has the entire request body stored in it as a JSON
			// Handle
			console.log("- BODY: " + JSON.stringify(body));
		});
	} else {
		// Getting the page
		// Write a response
		res.writeHead(200, { "Content-type": "text/html" });
		res.write(indexContents);
		res.end();
	}
})
//const ws = new websocket::WebSocketServer({"httpServer":httpServer});

// Test WASM
// TODO: make WASM work with node
//console.log("WASM check: 3 + 4 = " + mywasm.add(3, 4));
const wasmBuffer = fs.readFileSync('./wasm_modules/pkg/wasm_modules_bg.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
	// Exported function live under instance.exports
	const add = wasmModule.instance.exports.add as CallableFunction;
	const sum = add(5, 6);
	console.log("Testing WASM: " + sum); // Outputs 11
});

// Run
const PORT: number = 5005;
httpServer.listen(PORT, "127.0.0.1", () => console.log(`Server is open on port : ${PORT}`));

