# parenthesis [![Build Status](https://travis-ci.org/dfcreative/parenthesis.svg?branch=master)](https://travis-ci.org/dfcreative/parenthesis) [![Code Climate](https://codeclimate.com/github/dfcreative/parenthesis/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/parenthesis)


[![npm install parenthesis](https://nodei.co/npm/parenthesis.png?mini=true)](https://npmjs.org/package/parenthesis/)

```js
var parenthesis = require('parenthesis');

parenthesis.parse(':click :on( :not( :nth-child(5) ) )');
//⇒
[ ':click :on(\\3)', '5', ' :nth-child(\\1) ', ' :not(\\2) ' ]


parenthesis.stringify([':click :on(\\3)', '5', ' :nth-child(\\1) ', ' :not(\\2) ']);
//⇒
':click :on( :not( :nth-child(5) ) )'
```


## Related

* [balanced-match](http://npmjs.org/package/balanced-match)