# parenthesis [![Build Status](https://travis-ci.org/dfcreative/parenthesis.svg?branch=master)](https://travis-ci.org/dfcreative/parenthesis) [![Code Climate](https://codeclimate.com/github/dfcreative/parenthesis/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/parenthesis)


[![npm install parenthesis](https://nodei.co/npm/parenthesis.png?mini=true)](https://npmjs.org/package/parenthesis/)

```js
var parenthesis = require('parenthesis');
```

#### `parse(str, brackets?)`

Parse parentheses in a string `str` with possible custom `brackets`, like `'[]'`. Default `brackets` are `'()'`.

First item in the result is initial string with parentheses replaced with references to other items.

```js
parenthesis.parse(':click :on( :not( :nth-child(5) ) )');

//result
[ ':click :on(\\3)', '5', ' :nth-child(\\1) ', ' :not(\\2) ' ]
```


#### `stringify(string, ref1, ref2, ...)`, `stringify(refList)`

Replace references in `string` with the arguments in according places (like tiny templates). Or pass `refList`, where the first item is to be stringified.

```js
parenthesis.stringify(':click :on(\\3)', '5', ' :nth-child(\\1) ', ' :not(\\2) ')

//result
':click :on( :not( :nth-child(5) ) )'
```


## Related

* [balanced-match](http://npmjs.org/package/balanced-match)