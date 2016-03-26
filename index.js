/**
 * @module parenthesis
 */

var parse = require('./parse');
var stringify = require('./stringify');
parse.parse = parse;
parse.stringify = stringify;

module.exports = parse;