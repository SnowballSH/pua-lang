## A practice programming language

### To compile the test script:

- `ts-node main.ts <file name>.pua`

A Javascript file will be generated in the **same directory**

### To run the test script:

- `node <file name>.js`

Have fun!

Example:

```javascript
str = "SFSF"
function fn(a, b0) {
  log(b0);
  log(a);
  function lo() {
    js``;
    console.log(`${a} b0`)``;
  }
  lo();
}

fn(102908279627925, str);
```

Will be compiled to

```javascript
/*
Auto-generated code by Pua Programming Language
*/

const log = console.log;
const error = console.error;

// Main

var str = "SFSF"
function fn (a, b0) {
log(b0);
log(a);
function lo() {
console.log(`${a} b0`);
}
lo();
}
fn(102908279627925, (str));
```

And will be evaluated to

```
SFSF
102908279627925
102908279627925 b0
```
