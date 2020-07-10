const express = require("express");
const jsonServer = require("json-server");
const chokidar = require("chokidar");
const cors = require("cors");
const filename = process.argv[2] || "./data.js";
const port = process.argv[3] || 3500;

let router = undefined;

const app = express();

const createServer = () => {
    delete require.cache[require.resolve(filename)];
    setTimeout(() => {
        router = jsonServer.router(filename.endsWith('.js') ? require(filename)() : filename);
    }, 100)
}

createServer();

app.use(cors());
app.use(jsonServer.bodyParser);
app.use("/api", (req, resp, next) => router(req, resp, next));

chokidar.watch(filename).on("change", () => {
    console.log("Reloading web serving data...");
    createServer();
    console.log("Reloading web serving data complete.");
})

app.listen(port, () => console.log(`Web serving running on port ${port}`));
