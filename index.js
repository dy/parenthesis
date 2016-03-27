/**
 * @module parenthesis
 */

var parse = require('./parse');
var stringify = require('./stringify');


function parenthesis (arg) {
	if (arguments.length > 1 || Array.isArray(arg)) {
		return stringify.apply(this, arguments);
	}
	else {
		return parse(arg);
	}
}

parenthesis.toString =
parenthesis.valueOf = parenthesis;

parenthesis.parse = parse;
parenthesis.stringify = stringify;

module.exports = parenthesis;