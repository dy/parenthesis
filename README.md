# parenthesis [![Build Status](https://travis-ci.org/dfcreative/parenthesis.svg?branch=master)](https://travis-ci.org/dfcreative/parenthesis) [![Code Climate](https://codeclimate.com/github/dfcreative/parenthesis/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/parenthesis)

> Parse parentheses from a string, return list of parsed tokens with cross-references.

[![npm install parenthesis](https://nodei.co/npm/parenthesis.png?mini=true)](https://npmjs.org/package/parenthesis/)

```js
var parenthesis = require('parenthesis');


parenthesis.parse(':click :on( :not( :nth-child(x[1]) ) )');
//⇒
[ ':click :on(\\3)', '5', ' :nth-child(\\1) ', ' :not(\\2) ' ]


parenthesis.parse('a(b[c{d}])', ['{}', '[]', '()']);
//⇒
['a(\\3)', 'd', 'c{\\1}', 'b[\\2]']


parenthesis.stringify([':click :on(\\3)', '5', ' :nth-child(\\1) ', ' :not(\\2) ']);
//⇒
':click :on( :not( :nth-child(5) ) )'
```


## Related

* [balanced-match](http://npmjs.org/package/balanced-match)