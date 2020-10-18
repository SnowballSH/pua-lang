var fs = require("fs");
function compile(ast) {
  var res = run(ast);
  var builtin = fs.readFileSync("src/builtin.js").toString();
  return builtin + "\n// Main\n\n" + res;
}
function run(ast) {
  var str = [];
  ast.forEach(function (node) {
    str.push(visit(node));
  });
  return str.join("\n");
}
function visit(node) {
  var kind = node.type;
  switch (kind) {
    case "varAssign":
      return "var " + node.name + " = " + visit(node.value) + ";";
    case "varAccess":
      return "" + node.name;
    case "funcAccess":
      return (
        node.name +
        "(" +
        node.args
          .map(function (x) {
            return visit(x);
          })
          .join(", ") +
        ")"
      );
    case "arrowFuncAssign":
      return (
        "var " +
        node.name +
        " = (" +
        node.args
          .map(function (x) {
            return visit(x);
          })
          .join(", ") +
        ") => {return " +
        run(node.value) +
        "}"
      );
    case "funcAssign":
      return (
        "function " +
        node.name +
        " (" +
        node.args
          .map(function (x) {
            return visit(x);
          })
          .join(", ") +
        ") {\n" +
        node.value
          .map(function (x) {
            return visit(x);
          })
          .join("\n") +
        "\n}"
      );
    case "integer":
      return "" + parseInt(node.value);
    case "string":
      return "(`" + node.value + "`)";
    case "comment":
      return "//" + node.value;
    case "js":
      return ("" + node.value).trim();
    case "binOp":
      return (
        "" +
        node.value
          .map(function (x) {
            return visit(x);
          })
          .join(" ")
      );
    case "wrap":
      return "(" + visit(node.value) + ")";
    default:
      return node.value;
  }
}
module.exports = { run: run, visit: visit, compile: compile };
