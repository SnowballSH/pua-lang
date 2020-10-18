@{%
  var lexer = require('./lexer.js');
%}

@include "./factors.ne"

@lexer lexer

init -> multi:* {% id %}

multi -> _ stmt _ {% ([,s,]) => s %}

stmt 
  -> funcAssign    {% id %}
  |  varAssign     {% id %}
  |  expr          {% id %}
  |  comment       {% id %}

arrowFuncAssign
  -> %iden _ %lparen _ (idenBlock _):? %rparen _ %eq _ expr
  {%
    (k) => {
      a = k[0]
      b = k[9]
      j = k[4]
      return {
        type: "arrowFuncAssign",
        args: j ? j[0] : [],
        name: a,
        value: [b],
      }
    }
  %}

funcAssign
  -> %func _ %iden _ %lparen _ (idenBlock _):? %rparen _ %lbrace _ multi:* _ %rbrace
  {%
    (k) => {
      a = k[2]
      b = k[11]
      j = k[6]
      return {
        type: "funcAssign",
        args: j ? j[0] : [],
        name: a,
        value: b,
      }
    }
  %}

varAssign
  -> %iden _ %eq _ expr
  {%
    ([b,,,,c]) => {
      return {
        type: "varAssign",
        name: b,
        value: c,
      }
    }
  %}

expr
  -> factor       {% id %}
  |  binOp        {% id %}

factor
  -> %integer     {% id %}
  |  %string      {% id %}
  |  funcAccess   {% id %}
  |  arrowFuncAssign    {% id %}
  |  varAccess    {% id %}
  |  js           {% id %}
  |  wrap         {% id %}

wrap
  -> %lparen _ expr _ %rparen
  {%
    ([,,exp,,]) => {
      return {
        type: "wrap",
        value: exp,
      }
    }
  %}

binOp
  -> expr _ %op _ factor
  {%
    ([a,,op,,b]) => {
      return {type: "binOp", value: [a,op,b]}
    }
  %}
