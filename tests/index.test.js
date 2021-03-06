import fs from "fs";
import path from "path";
import assert from "assert";
import { parse as babelParse } from "@babel/parser";
import { generate as astringGenerate } from "astring";
import { generator, expressionsPrecedence } from "../src/index";

const FIXTURES_FOLDER = path.join(__dirname, "fixtures");
const files = fs.readdirSync(FIXTURES_FOLDER).sort();
const options = {
  allowReturnOutsideFunction: true,
  strictMode: false,
  sourceType: "module",
};

function generate(ast) {
  let generated = astringGenerate(ast.program, {
    generator,
    expressionsPrecedence,
    comments: true,
    sourceMap: null,
  });
  return generated;
}

describe("astring babel generator", () => {
  files.forEach((filename) => {
    it(filename, function () {
      const code = fs.readFileSync(
        path.join(FIXTURES_FOLDER, filename),
        "utf8"
      );
      const ast = babelParse(code, options);
      let content = generate(ast);
      if (filename === "valid-only.js") {
        babelParse(content), options;
      } else {
        assert.strictEqual(
          content,
          code,
          `${filename.substring(0, filename.length - 3)} does not is not valid`
        );
      }
    });
  });
});
