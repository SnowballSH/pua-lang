const parse = require("./src/parser.ts");
const vm = require("./src/vm.ts");
const see = console.log;
let res: Array<any> = parse("./test.pua");
let myVm = new vm.VM();
myVm.run(res);
see(myVm.storage);
