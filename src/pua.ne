@{%
  var lexer = require('./lexer.ts');
%}

@include "./factors.ne"

@lexer lexer

init -> multi:* {% id %}

multi -> _ stmt _ {% ([,s,]) => s %}

stmt 
  -> funcAssign {% id %}
  |  varAssign  {% id %}
  |  expr       {% id %}

funcAssign
  -> %iden _ %lparen _ %rparen _ %eq _ expr
  {%
    ([a,,,,,,,,b]) => {
      return {
        type: "funcAssign",
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
  |  return_      {% id %}

return_ -> %return_ _ expr
    {%
      ([,,a]) => {
        return {
          type: "return",
          name: "return",
          value: a,
        }
      }
    %}
