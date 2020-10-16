class BaseObject {
  constructor(value: any) {
    this.value = value;
    this.type = "BaseObject";
  }

  value: any;
  type: string;
}

class _Integer extends BaseObject {
  constructor(value: any) {
    super(value);
    this.type = "Integer";
  }
}

class _String extends BaseObject {
  constructor(value: any) {
    super(value);
    this.type = "String";
  }
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

      case "varAccess":
        if (node.name in this.storage) {
          return this.storage[node.name];
        } else {
          console.error(`Name '${node.name}' is not defined`);
          return new BaseObject(undefined);
        }

      case "integer":
        return new _Integer(parseInt(node.value));

      case "string":
        return new _String(node.value);

      default:
        return node.value;
    }
  }
}

module.exports = { VM, BaseObject };
