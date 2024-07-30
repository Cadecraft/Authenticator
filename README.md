# Authenticator

A fork of AMC-code's Authenticator project, for experimenting

## Behaviour

The server will calculate the sum of a number, and start serving an HTML page

## Why this fork? Features, fixes, and goals

Features: add Rust🦀, add WebAssembly🧩, add dark theme🌙

Fixes: use Typescript🇹 instead of JavaScript

Goals: server-side rendering of a new, original 2d block-based survival game world

Non-goals: clean, readable, or organized code; foresight; reason

## Running the server:

Prerequisites:
```
cargo install wasm-pack
npm install -g typescript
```

Run this command in the `wasm_modules` folder to build the wasm:
```
wasm-pack build --target web
```

Run this command in the main `Authenticator` folder to compile to js:
```
npx tsc server.ts
```

Run this command to actually run the server on port `5005`:
```
node server.js
```
