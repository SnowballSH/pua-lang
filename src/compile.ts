var fs = require("fs");

function compile(ast: Array<any>) {
  const res: string = run(ast);
  const builtin: string = fs.readFileSync("src/builtin.js").toString();
  return builtin + "\n// Main\n\n" + res;
}

function run(ast: Array<any>) {
  var str: Array<string> = [];
  ast.forEach((node) => {
    str.push(visit(node));
  });
  return str.join("\n");
}

function visit(node: any) {
  var kind: string = node.type;
  switch (kind) {
    case "varAssign":
      return `var ${node.name} = ${visit(node.value)};`;

    case "varAccess":
      return `${node.name}`;

    case "funcAccess":
      return `${node.name}(${node.args.map((x: any) => visit(x)).join(", ")})`;

    case "arrowFuncAssign":
      return `var ${node.name} = (${node.args
        .map((x: any) => visit(x))
        .join(", ")}) => {return ${run(node.value)}}`;

    case "funcAssign":
      return `function ${node.name} (${node.args
        .map((x: any) => visit(x))
        .join(", ")}) {\n${node.value.map((x: any) => visit(x)).join("\n")}\n}`;

    case "integer":
      return `${parseInt(node.value)}`;

    case "string":
      return `("${node.value}")`;

    case "comment":
      return `//${node.value}`;

    case "js":
      return `${node.value}`.trim();

    case "binOp":
      return `${node.value.map((x: any) => visit(x)).join(" ")}`;

    default:
      return node.value;
  }
}

module.exports = { run, visit, compile };
