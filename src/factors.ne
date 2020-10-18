@{%
  var lexer = require('./lexer.ts');
%}

@lexer lexer

funcAccess
  -> %iden _ %lparen _ (argBlock _):? %rparen
  {%
    ([a,,,,b,]) => {
      return {
        type: "funcAccess",
        args: b ? b[0] : [],
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

idenBlock
  -> %iden
  |  idenBlock _ %comma _ %iden
  {%
    ([a,,,,b]) => {
      return [...a,b]
    }
  %}

argBlock
  -> expr
  |  argBlock _ %comma _ expr
  {%
    ([a,,,,b]) => {
      return [...a,b]
    }
  %}

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

js
  -> %js _ %string
  {%
    ([,,b]) => {
      return {
        type: "js",
        value: b,
      }
    }
  %}

_ -> (%WS | %NL):* {% id %}
