## A practice programming language

### To compile the test script:

- `node main.js <file name>.pua`

A Javascript file will be generated in the **same directory**

### To run the test script:

- `node <file name>.pua.js`

Have fun!

***

## Language Tour

##### Comment

```javascript
// I am a comment in pua
log! 1  // me too
```

##### Numeric expressions

```javascript
1 + 2 * 3
(1 + 2) * 3
```

##### String

```javascript
"I am a simple string in pua"
'Me too'
``
Same!
But I can do
Multi lines
``
```

##### Invoke functions

```javascript
log! "Hello,", "world!"
log < "Hello,", "world!" >
```

### Tip: using "!" to invoke function may cause ambigious parsing - it may not generate the result you want. Therefore, <> is a better solution.

##### Variable Assignment

```python
a = 3
B_79po = "I am too!"
a = "I can be reused"
```

##### Function Assignment

```javascript
function myFunc (arg1, arg2, arg3) {
  log! arg1, arg2, arg3
}
```

##### Lambda Function Assignment

```javascript
f(x) = (x + 4)
g(x, y) = (3 * x - y)

log<f<3>>
log<g<5, 7>>
```

##### Can't seem to do things in pua right now? Try this:

```javascript
x = '   trim me   '
log! (js"x.trim()")

// Output
// trim me
```
