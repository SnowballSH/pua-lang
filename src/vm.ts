const dt = require("./datatypes.ts");

class VM {
  constructor() {}

  storage = {
    log: new dt._NativeFunction([
      new dt._NativeFunction(() => console.log(4444)),
    ]),
  };

  run(ast: Array<any>) {
    ast.forEach((node) => {
      this.visit(node);
    });
    return this;
  }

  runFunc(ast: Array<any>) {
    if (ast[0].type === "NativeFunction") {
      return ast[0].value();
    }
    ast.forEach((node) => {
      var res = this.visit(node);
      if (res.type === "return") {
        return res.value;
      }
    });
    return new dt.BaseObject(null);
  }

  visit(node: any) {
    var kind: string = node.type;
    switch (kind) {
      case "varAssign":
        this.storage[node.name] = this.visit(node.value);
        return new dt.BaseObject(null);

      case "varAccess":
        if (node.name in this.storage) {
          return this.storage[node.name];
        } else {
          console.error(`Name '${node.name}' is not defined`);
          return new dt.BaseObject(undefined);
        }

      case "funcAccess":
        if (node.name in this.storage) {
          var obj = this.storage[node.name];
          if (!obj.callable) {
            console.error(`Name '${node.name}' is not callable`);
            return new dt.BaseObject(undefined);
          }
          this.runFunc(obj.value);
          return new dt.BaseObject(null);
        } else {
          console.error(`Name '${node.name}' is not defined`);
          return new dt.BaseObject(undefined);
        }

      case "funcAssign":
        this.storage[node.name] = new dt._Function(node.value);
        return new dt.BaseObject(null);

      case "integer":
        return new dt._Integer(parseInt(node.value));

      case "string":
        return new dt._String(node.value);

      case "return":
        return new dt._Return(this.visit(node.value));

      default:
        return node.value;
    }
  }
}

module.exports = { VM };
