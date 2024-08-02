// Requires
import * as http from "http";
import * as fs from "fs";
//import * as mywasm from "./wasm_modules/pkg";

// Information
let totalcount: number = 0;

// Test WASM
// TODO: server-side rendering of the HTML and game and stuff
const wasmBuffer = fs.readFileSync('./wasm_modules/pkg/wasm_modules_bg.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {

	// Exported function live under instance.exports
	const add = wasmModule.instance.exports.add as CallableFunction;
	const renderpage = wasmModule.instance.exports.renderpage as CallableFunction;
	const sum = add(5, 6);
	console.log("Testing WASM (should output 11): " + sum); // Outputs 11
	console.log("Testing WASM (should output a span): " + renderpage(3)); // Outputs 11

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
				totalcount = add(totalcount, 1);
				console.log("- " + body.value + " (x" + body.count + ") (global x" + totalcount + ")");
			});
		} else {
			// Getting the page
			// Update the page (this is a very bad idea but funny to do)
			// Start render region
			let newIndex = indexContents.substring(0, indexContents.search("<!-- BEGIN Render Region! -->"));
			// RENDER
			// TODO: automate the build process to make this stuff easier
			// TODO: render more of the page in rust
			// TODO: fix showing as "undefined" from rust
			//newIndex += renderpage(totalcount);
			newIndex += "<span style=\"color: cyan;\">" + totalcount + "</span>";
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

});
