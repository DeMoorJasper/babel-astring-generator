const fs = require("fs");
const path = require("path");
const astring = require("astring");
const { parse } = require("@babel/parser");
const babelGenerate = require("@babel/generator").default;
const b = require("benny");
const { generator, expressionsPrecedence } = require("./lib/index");

const FILE_CONTENT = fs.readFileSync(
  path.join(__dirname, "./tests/fixtures/function.js"),
  "utf-8"
);

b.suite(
  "generate",
  b.add("astring", () => {
    const ast = parse(FILE_CONTENT);
    astring.generate(ast.program, {
      generator,
      expressionsPrecedence,
      comments: true,
      sourceMap: null,
    });
  }),
  b.add("babel", () => {
    const ast = parse(FILE_CONTENT);
    babelGenerate(ast);
  }),
  b.cycle(),
  b.complete()
);
