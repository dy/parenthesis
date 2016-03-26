/**
 * @module parenthesis/stringify
 *
 * Stringify an array/object with parenthesis references
 *
 * @param {Array|Object} arr An array or object where 0 is initial string
 *                           and every other key/value is reference id/value to replace
 *
 * @return {string} A string with inserted regex references
 */

//FIXME: circular references cause recursions here
//TODO: there’s possible a recursive version of this algorithm, so test it & compare
module.exports = function (str, refs, bracket){
	var prevStr;

	//pretend bad string stringified with no parentheses
	if (!str) return '';

	if (typeof str !== 'string') {
		bracket = refs;
		refs = str;
		str = refs[0];
	}

	bracket = bracket || '()';

	function replaceRef(token, idx, str){
		return bracket[0] + refs[token.slice(1)] + bracket[1];
	}

	while (str != prevStr) {
		prevStr = str;
		str = str.replace(/\\[0-9]+/, replaceRef);
	}

	return str;
};