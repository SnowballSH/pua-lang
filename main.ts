const parse = require("./src/parser.ts");
const cp = require("./src/compile.ts");
var fs = require("fs");
const see = console.log;

function main() {
  try {
    var res: Array<any> = parse("./test/test.pua");
  } catch (error) {
    console.error("Error while parsing:");
    console.error(error.message.split("\n", 3).join("\n") + "\n");
    //console.error(error);
    return 1;
  }

  fs.writeFileSync("./test/test.js", cp.compile(res));
  return 0;
}

main();
