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

class _NativeFunction extends BaseObject {
  constructor(value: any) {
    super(value);
    this.type = "NativeFunction";
    this.callable = true;
  }
}

class _Return extends BaseObject {
  constructor(value: any) {
    super(value);
    this.type = "Return";
  }
}

module.exports = {
  BaseObject,
  _Function,
  _NativeFunction,
  _Integer,
  _String,
  _Return,
};
