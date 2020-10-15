@{%
  var lexer = require('./lexer.ts');
%}

@lexer lexer

funcAccess
  -> %iden _ %lparen _ %rparen
  {%
    ([a,,,,]) => {
      return {
        type: "funcAccess",
        name: a.value,
        value: a.value,
      }
    }
  %}

varAccess
  -> %iden
  {%
    ([a]) => {
      return {
        type: "varAccess",
        name: a.value,
        value: a.value,
      }
    }
  %}

_ -> (%WS | %NL):* {% id %}
