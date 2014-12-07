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
module.exports = function (obj, entry, bracket){
	var str, prevStr;

	if (typeof entry === 'string') {
		bracket = entry;
		entry = 0;
	} else {
		bracket = bracket || '()';
		entry = entry || 0;
	}

	str = obj[entry];


	function replaceRef(token, idx, str){
		return bracket[0] + obj[token.slice(1)] + bracket[1];
	}

	while (str != prevStr) {
		prevStr = str;
		str = str.replace(/\\[0-9]+/, replaceRef);
	}

	return str;
};