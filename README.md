# parenthesis [![Build Status](https://travis-ci.org/dfcreative/parenthesis.svg?branch=master)](https://travis-ci.org/dfcreative/parenthesis) [![Code Climate](https://codeclimate.com/github/dfcreative/parenthesis/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/parenthesis)

> Parse parentheses from a string, return folded arrays.

[![npm install parenthesis](https://nodei.co/npm/parenthesis.png?mini=true)](https://npmjs.org/package/parenthesis/)

```js
var parse = require('parenthesis');


parse('a(b[c{d}])');
//⇒
['a(', ['b[', ['c{', ['d'], '}'], ']'], ')'];


parse.stringify(['a(', ['b[', ['c{', ['d'], '}'], ']'], ')']);
//⇒
'a(b[c{d}])';


parse('a(b[c{d}])', {
	brackets: ['()'],
	escape: '\\',
	flat: true
});
//⇒
['a(\\1)', 'b[c{d}]'];
```


## Related

* [balanced-match](http://npmjs.org/package/balanced-match)