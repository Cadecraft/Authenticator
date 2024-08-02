// Requires
import * as http from "http";
import * as fs from "fs";
import * as mywasm from "./wasm_modules/pkg";

// Information
let totalcount: number = 0;

// Test WASM
// TODO: server-side rendering of the HTML and game and stuff
const sum = mywasm.add(5, 6);
console.log("Testing WASM (should output 11): " + sum);

// Serving contents and setup
let indexContents: string = fs.readFileSync("./index.html", "utf8");
const httpServer = http.createServer(function (req, res) {
	console.log(req.method + " request was made");
	if (req.method == "POST") {
		// Post
		// TODO: it only lets you send 9 of these?
		// Get the actual body
		let bodyArr = [];
		req.on("data", chunk => {
			bodyArr.push(chunk);
		}).on("end", () => {
			let body = JSON.parse(Buffer.concat(bodyArr).toString());
			// At this point, `body` has the entire request body stored in it as a JSON
			// Handle using the Rust/WebAssembly function!
			totalcount = mywasm.add(totalcount, 1);
			console.log("- " + body.value + " (x" + body.count + ") (global x" + totalcount + ")");
		});
	} else {
		// Getting the page
		// Update the page (this is a very bad idea but funny to do)
		// Start render region
		let newIndex = indexContents.substring(0, indexContents.search("<!-- BEGIN Render Region! -->"));
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
})

// Run
const PORT: number = 5005;
httpServer.listen(PORT, "127.0.0.1", () => console.log(`Server is open on port : ${PORT}`));
