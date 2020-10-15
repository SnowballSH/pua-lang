class BaseObject {
  constructor(value: any) {
    this.value = value;
  }

  value: any;
}

class VM {
  constructor() {}

  storage = {};

  run(ast: Array<any>) {
    ast.forEach((node) => {
      this.visit(node);
    });
    return this;
  }

  visit(node: any) {
    var kind: string = node.type;
    switch (kind) {
      case "varAssign":
        this.storage[node.name] = this.visit(node.value);
        return new BaseObject(null);

      case "integer":
        return parseInt(node.value);

      default:
        return node.value;
    }
  }
}

module.exports = { VM, BaseObject };
