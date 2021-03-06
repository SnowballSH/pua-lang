var moo = require("moo");
var lexer = moo.compile({
  WS: /[ \t]+/,
  comment: {
    match: /\/\/.*?$/,
    lineBreaks: true,
    value: function (x) {
      return x.substring(2);
    },
  },
  integer: /0|[1-9][0-9]*/,
  string: [
    {
      match: /"""[^]*?"""/,
      lineBreaks: true,
      value: function (x) {
        return x.slice(3, -3);
      },
    },
    {
      match: /``[^]*?``/,
      lineBreaks: true,
      value: function (x) {
        return x.slice(3, -3);
      },
    },
    {
      match: /"(?:\\["\\rn]|[^"\\])*?"/,
      lineBreaks: true,
      value: function (x) {
        return x.slice(1, -1);
      },
    },
    {
      match: /'(?:\\['\\rn]|[^'\\])*?'/,
      lineBreaks: true,
      value: function (x) {
        return x.slice(1, -1);
      },
    },
  ],
  lparen: "(",
  rparen: ")",
  lbrace: "{",
  rbrace: "}",
  comma: ",",
  dot: ".",
  ltri: "<",
  rtri: ">",
  op: ["+", "-", "*", "/"],
  excl: "!",

  func: "function",
  js: "js",
  _if: "if",
  _else: "else",
  ret: "return",

  iden: /[A-Za-z_][\w]*/,
  eq: "=",
  NL: { match: /[\n\r]+/, lineBreaks: true },
});
module.exports = lexer;
