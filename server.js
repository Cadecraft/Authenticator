"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Requires
var http = require("http");
var fs = require("fs");
var mywasm = require("./wasm_modules/pkg");
// Information
var totalcount = 0;
// Test WASM
// TODO: server-side rendering of the HTML and game and stuff
var sum = mywasm.add(5, 6);
console.log("Testing WASM (should output 11): " + sum);
// Serving contents and setup
var indexContents = fs.readFileSync("./index.html", "utf8");
var httpServer = http.createServer(function (req, res) {
    console.log(req.method + " request was made");
    if (req.method == "POST") {
        // Post
        // TODO: it only lets you send 9 of these?
        // Get the actual body
        var bodyArr_1 = [];
        req.on("data", function (chunk) {
            bodyArr_1.push(chunk);
        }).on("end", function () {
            var body = JSON.parse(Buffer.concat(bodyArr_1).toString());
            // At this point, `body` has the entire request body stored in it as a JSON
            // Handle using the Rust/WebAssembly function!
            totalcount = mywasm.add(totalcount, 1);
            console.log("- " + body.value + " (x" + body.count + ") (global x" + totalcount + ")");
        });
    }
    else {
        // Getting the page
        // Update the page (this is a very bad idea but funny to do)
        // Start render region
        var newIndex = indexContents.substring(0, indexContents.search("<!-- BEGIN Render Region! -->"));
        // RENDER
        // TODO: automate the build process to make this stuff easier?
        newIndex += mywasm.renderpage(totalcount);
        // END RENDER
        // End render region
        newIndex += indexContents.substring(indexContents.search("<!-- END Render Region! -->"));
        // Write the response
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(newIndex);
        res.end();
    }
});
// Run
var PORT = 5005;
httpServer.listen(PORT, "127.0.0.1", function () { return console.log("Server is open on port : ".concat(PORT)); });
