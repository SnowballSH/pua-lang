class BaseObject {
  constructor(value: any) {
    this.value = value;
    this.type = "BaseObject";
    this.callable = false;
  }

  value: any;
  type: string;
  callable: boolean;
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

class _Function extends BaseObject {
  constructor(value: any) {
    super(value);
    this.type = "Function";
    this.callable = true;
  }
}

class _Return extends BaseObject {
  constructor(value: any) {
    super(value);
    this.type = "Return";
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

  runFunc(ast: Array<any>) {
    ast.forEach((node) => {
      var res = this.visit(node);
      if (res.type === "return") {
        return res.value;
      }
    });
    return new BaseObject(null);
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

      case "funcAccess":
        if (node.name in this.storage) {
          var obj = this.storage[node.name];
          if (!obj.callable) {
            console.error(`Name '${node.name}' is not callable`);
            return new BaseObject(undefined);
          }
          this.runFunc(obj.value);
          return new BaseObject(null);
        } else {
          console.error(`Name '${node.name}' is not defined`);
          return new BaseObject(undefined);
        }

      case "funcAssign":
        this.storage[node.name] = new _Function(node.value);
        return new BaseObject(null);

      case "integer":
        return new _Integer(parseInt(node.value));

      case "string":
        return new _String(node.value);

      case "return":
        return new _Return(this.visit(node.value));

      default:
        return node.value;
    }
  }
}

module.exports = { VM, BaseObject };
