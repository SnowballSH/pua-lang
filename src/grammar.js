// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  var lexer = require('./lexer.ts');


  var lexer = require('./lexer.ts');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "funcAccess", "symbols": [(lexer.has("iden") ? {type: "iden"} : iden), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        ([a,,,,]) => {
          return {
            type: "funcAccess",
            name: a.value,
            value: a.value,
          }
        }
          },
    {"name": "varAccess", "symbols": [(lexer.has("iden") ? {type: "iden"} : iden)], "postprocess": 
        ([a]) => {
          return {
            type: "varAccess",
            name: a.value,
            value: a.value,
          }
        }
          },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": id},
    {"name": "init$ebnf$1", "symbols": []},
    {"name": "init$ebnf$1", "symbols": ["init$ebnf$1", "multi"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "init", "symbols": ["init$ebnf$1"], "postprocess": id},
    {"name": "multi", "symbols": ["_", "stmt", "_"], "postprocess": ([,s,]) => s},
    {"name": "stmt", "symbols": ["funcAssign"], "postprocess": id},
    {"name": "stmt", "symbols": ["varAssign"], "postprocess": id},
    {"name": "stmt", "symbols": ["expr"], "postprocess": id},
    {"name": "funcAssign", "symbols": [(lexer.has("iden") ? {type: "iden"} : iden), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("eq") ? {type: "eq"} : eq), "_", "expr"], "postprocess": 
        ([a,,,,,,,,b]) => {
          return {
            type: "funcAssign",
            name: a,
            value: [b],
          }
        }
          },
    {"name": "varAssign", "symbols": [(lexer.has("iden") ? {type: "iden"} : iden), "_", (lexer.has("eq") ? {type: "eq"} : eq), "_", "expr"], "postprocess": 
        ([b,,,,c]) => {
          return {
            type: "varAssign",
            name: b,
            value: c,
          }
        }
          },
    {"name": "expr", "symbols": [(lexer.has("integer") ? {type: "integer"} : integer)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": ["funcAccess"], "postprocess": id},
    {"name": "expr", "symbols": ["varAccess"], "postprocess": id}
]
  , ParserStart: "init"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
