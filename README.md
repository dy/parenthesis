# parenthesis [![Build Status](https://travis-ci.org/dfcreative/paren.svg?branch=master)](https://travis-ci.org/dfcreative/paren) <a href="http://unlicense.org/UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>

**Parse** parenthesises in a string:

```js
parenthesis.parse(':click :on( :not( :nth-child(5) ) )');

[
	':click :on\\1',
	' :not\\2 ',
	' :nth-child\\3 ',
	'5'
]
```

First item in result is initial string with parenthesis replaced with regexy references to anther items.


**Stringify** does backwise operation:

```js
parenthesis.stringify(['abc\\1', '123']) === 'abc(123)'
```

# API

Methods `parse` and `stringify` are available on `parenthesis`, which is the main package exports. You can also require needed method as `require('parenthesis/parse')` or `require('parenthesis/stringify')`.

#### `parenthesis(arg)`

Call parse or stringify depending on a type of `arg`. If it is string - do parse, else - stringify.

#### `parse(str [, brackets])`

Parse parenthesis in a string `str` with optional `brackets` example, like `'[]'`. Default `brackets` - `'()'`.

#### `stringify(refs [, brackets])`

Replace references in `refs`, starting from `refs[0]`. Return resulting string.


# Contribute

* Add escaping (waiting for a use-case).
* Add streaming version.


[![NPM](https://nodei.co/npm/parenthesis.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/parenthesis/)