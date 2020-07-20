const express = require("express");
const jsonServer = require("json-server");
const chokidar = require("chokidar");
const cors = require("cors");
const fs = require("fs");
const {buildSchema} = require("graphql");
const graphQLHTTP = require("express-graphql");
const queryResolvers = require("./serverQueriesResolver.graphql");
const mutationResolvers = require("./serverMutationsResolver.graphql");

const filename = process.argv[2] || "./data.js";
const port = process.argv[3] || 3500;

let router = undefined;
let graph = undefined;

const app = express();

const createServer = () => {
    delete require.cache[require.resolve(filename)];
    setTimeout(() => {
        router = jsonServer.router(filename.endsWith('.js') ? require(filename)() : filename);
        let schema = fs.readFileSync("./src/serverQueriesSchema.graphql", "utf-8") +
            fs.readFileSync("./src/serverMutationsSchema.graphql", "utf-8");
        let resolvers = {...queryResolvers, ...mutationResolvers};
        graph = graphQLHTTP({
            schema: buildSchema(schema), rootValue: resolvers,
            graphiql: true, context: {db: router.db},
        })
    }, 100)
}

createServer();

app.use(cors());
app.use(jsonServer.bodyParser);
app.use("/api", (req, resp, next) => router(req, resp, next));
app.use("/graphql", (req, resp, next) => graph(req, resp, next));

chokidar.watch(filename).on("change", () => {
    console.log("Reloading web serving data...");
    createServer();
    console.log("Reloading web serving data complete.");
})

app.listen(port, () => console.log(`Web serving running on port ${port}`));
