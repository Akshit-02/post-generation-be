const { mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { writeFileSync } = require("fs");
const path = require("path");
const { print } = require("graphql");

const typesArray = loadFilesSync(path.join(__dirname, "appsync/schemas"), {
  extensions: ["graphql"],
});
const typeDefs = mergeTypeDefs(typesArray);

const typeDefsString = print(typeDefs);

writeFileSync(path.join(__dirname, "appsync/schema.graphql"), typeDefsString);
console.log("Schema merged successfully!");
