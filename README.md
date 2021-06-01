# astring generator for the Babel AST

An astring generator that is compatible with the Babel AST.

## Usage

```JS
import * as astring from "astring";
import { generator, expressionsPrecedence } from "./lib/index";

astring.generate(ast.program, {
  generator,
  expressionsPrecedence,
  comments: true,
  sourceMap: null,
});
```
