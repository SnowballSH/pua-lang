const parse = require("./src/parser.ts");
const cp = require("./src/compile.ts");
var fs = require("fs");
const see = console.log;

function main() {
  if (process.argv.length < 3) {
    console.error("File name expected");
    return 1;
  }
  const fn = process.argv[2];

  try {
    var res: Array<any> = parse(fn);
    //console.log(res);
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
