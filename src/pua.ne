@{%
  var lexer = require('./lexer.ts');
%}

@include "./factors.ne"

@lexer lexer

init -> multi:* {% id %}

multi -> _ stmt _ {% ([,s,]) => s %}

stmt 
  -> varAssign  {% id %}
  |  expr       {% id %}

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
