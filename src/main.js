var parse = require("./parser.js");
var cp = require("./compile.js");
var fs = require("fs");

function runCode(code) {
  try {
    var res = parse(code);
    //console.log(res);
  } catch (error) {
    console.error("Error while parsing:");
    console.error(error.message.split("\n", 3).join("\n") + "\n");
    //console.error(error);
    return 1;
  }
  return cp.compile(res);
}
function main() {
  if (process.argv.length < 3) {
    console.error("File name expected");
    return 1;
  }
  var fn = process.argv[2];
  var code = fs.readFileSync(fn).toString();
  var res = runCode(code);
  if (res === 1) {
    return 1;
  }
  fs.writeFileSync(fn + ".js", res);
  return 0;
}
main();
