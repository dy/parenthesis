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
//TODO: a recursive version of this algorithm is possible, so test it & compare
module.exports = function (refsList){
	//pretend bad string stringified with no parentheses
	if (!refsList) return '';

	if (arguments.length > 1) {
		var refs = arguments;
	}
	else {
		var refs = refsList;
	}

	var str = refs[0];

	var prevStr;

	function replaceRef(token, idx, str){
		return refs[token.slice(1)];
	}

	var a = 0;
	while (str != prevStr) {
		prevStr = str;
		str = str.replace(/\\[0-9]+/, replaceRef);
		if (a++ > 10e3) {
			throw Error('References have circular dependency. Please, check them.');
		}
	}

	return str;
};