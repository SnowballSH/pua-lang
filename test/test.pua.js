/*
Auto-generated code by Pua Programming Language
*/

const log = console.log;
const error = console.error;
const dir = console.dir;
function timer(name, mode) {mode = mode.toLowerCase();if (mode === "timeEnd" || mode === "end") {console.timeEnd(name);} else if (mode === "timeLog" || mode === "log") {console.timeLog(name)} else {console.time(name);}}

const random = Math.random;
function module_export(exp) { module.exports = exp; }

// Main

timer(("myTimer"), ("start"))
timer(("myTimer"), ("end"))