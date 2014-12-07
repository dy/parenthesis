/**
 * @module parenthesis
 */
module.exports = paren;

var parse = paren.parse = require('./parse');
var stringify = paren.stringify = require('./stringify');


/**
 * Recognize arg, do parse or stringify depending on a type
 */
function paren(arg, a, b) {
	if (typeof arg === 'string') return parse(arg, a, b);
	return stringify(arg, a, b);
}