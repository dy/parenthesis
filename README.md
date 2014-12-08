# parenthesis [![Build Status](https://travis-ci.org/dfcreative/parenthesis.svg?branch=master)](https://travis-ci.org/dfcreative/parenthesis) <a href="http://unlicense.org/UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>

**Parse** parentheses from a string:

```js
parenthesis.parse(':click :on( :not( :nth-child(5) ) )');

//result
[ ':click :on\\3', '5', ' :nth-child\\1 ', ' :not\\2 ' ]
```

First item in the result is initial string with parentheses replaced with regexy references to other items.


**Stringify** does backwise:

```js
parenthesis.stringify([':click :on\\3', '5', ' :nth-child\\1 ', ' :not\\2 ']) === ':click :on( :not( :nth-child(5) ) )'
```

## API


#### `parse(str [, brackets])`

Parse parenthesis in a string `str` with optional `brackets`, like `'[]'`. Default `brackets` are `'()'`.


#### `stringify([string,] refsList [, brackets])`

Replace regexy references in `string` by the ones from `refList`. If string is undefined, use `refsList[0]`. Example:

```js
parenthesis.stringify(':not\\2', ['5', ':nth-child\\1']);

//result
':not(:nth-child(5))'
```



# Contribute

* Add escaping (waiting for a use-case).
* Add streaming version.
* Pass array to the brackets, to use moustache brackets `['{{', '}}']`.


[![NPM](https://nodei.co/npm/parenthesis.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/parenthesis/)