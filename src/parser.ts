import * as nearley from "nearley";
const grammar = require("./grammar.js");
var fs = require("fs");

function _parse(filename: String) {
  const code = fs.readFileSync(filename).toString();
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(code);

  function makeAST() {
    const ast = parser.results[0];
    return ast;
  }

  var ot: String;
  if (parser.results.length > 1) {
    //console.log("Warning: Ambigious Grammar Found");
    ot = makeAST();
  } else if (parser.results.length == 1) {
    ot = makeAST();
  } else {
    console.log("Error: no parse found.");
  }
  return ot;
}

module.exports = _parse;
