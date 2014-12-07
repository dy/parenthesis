/**
 * @module parenthesis
 */
module.exports = paren;

var parse = paren.parse = require('./parse');
var stringify = paren.stringify = require('./stringify');


/**
 * Recognize arg, do parse or stringify depending on a type
 */
function paren(arg, bracket) {
	if (typeof arg === 'string') return parse(arg, bracket);
	return stringify(arg, bracket);
}