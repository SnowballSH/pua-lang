var nearley = require("nearley");
var grammar = require("./grammar.js");
var fs = require("fs");
function _parse(code) {
  var parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(code);
  function makeAST() {
    var ast = parser.results[0];
    return ast;
  }
  var ot;
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
