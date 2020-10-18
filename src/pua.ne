@{%
  var lexer = require('./lexer.ts');
%}

@include "./factors.ne"

@lexer lexer

init -> multi:* {% id %}

multi -> _ stmt _ {% ([,s,]) => s %}

stmt 
  -> arrowFuncAssign    {% id %}
  |  varAssign          {% id %}
  |  expr               {% id %}
  |  comment           {% id %}

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
  -> %integer     {% id %}
  |  %string      {% id %}
  |  funcAccess   {% id %}
  |  varAccess    {% id %}

comment
  -> %comment
  {%
    ([c]) => {
      return {
        type: "comment",
        value: c,
      }
    }
  %}
