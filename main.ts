const parse = require("./src/parser.ts");
const vm = require("./src/vm.ts");
const see = console.log;

function main() {
  try {
    var res: Array<any> = parse("./test.pua");
  } catch (error) {
    console.error("Error while parsing:");
    console.error(error.message.split("\n", 3).join("\n") + "\n");
    return 1;
  }

  let myVm = new vm.VM();
  myVm.run(res);
  see(myVm.storage);
  return 0;
}

main();
