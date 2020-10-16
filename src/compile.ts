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
      return `${node.name}();`;

    case "funcAssign":
      return `function ${node.name}() {\n${run(node.value)}\n}`;

    case "integer":
      return `${parseInt(node.value)}`;

    case "string":
      return `"${node.value}"`;

    default:
      return node.value;
  }
}

module.exports = { run, visit };
