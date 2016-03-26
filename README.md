# parenthesis [![Build Status](https://travis-ci.org/dfcreative/parenthesis.svg?branch=master)](https://travis-ci.org/dfcreative/parenthesis) [![Code Climate](https://codeclimate.com/github/dfcreative/parenthesis/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/parenthesis)


**Parse** parentheses in a string:

```js
parenthesis.parse(':click :on( :not( :nth-child(5) ) )');

//result
[ ':click :on\\3', '5', ' :nth-child\\1 ', ' :not\\2 ' ]
```

First item in the result is initial string with parentheses replaced with references to other items.


**Stringify** does backwise:

```js
parenthesis.stringify([':click :on\\3', '5', ' :nth-child\\1 ', ' :not\\2 '])

//result
':click :on( :not( :nth-child(5) ) )'
```

## API


#### `parse(str [, brackets])`

Parse parenthesis in a string `str` with optional `brackets`, like `'[]'`. Default `brackets` are `'()'`.


#### `stringify([string,] refsList [, brackets])`

Replace references in `string` with the ones from `refList` (like tiny templates). If string is omitted, will be used `refsList[0]`. Example:

```js
parenthesis.stringify(':not\\2', ['5', ':nth-child\\1']);

//result
':not(:nth-child(5))'
```



## Contribute

* Double brackets (other parsing algorithm)
* Escape references


## Related

* [balanced-match](http://npmjs.org/package/balanced-match)


[![NPM](https://nodei.co/npm/parenthesis.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/parenthesis/)