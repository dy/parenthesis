/**
 * @module  parenthesis/parse
 *
 * Parse a string with parenthesis.
 *
 * @param {string} str A string with parenthesis
 *
 * @return {Array} A list with parsed parens, where 0 is initial string.
 */

//TODO: implement sequential parser of this algorithm, compare performance.
module.exports = function(str, bracket){
	//pretend non-string parsed per-se
	if (typeof str !== 'string') return [str];

	var res = [], prevStr;

	bracket = bracket || '()';

	//create parenthesis regex
	var pRE = new RegExp(['\\', bracket[0], '[^\\', bracket[0], '\\', bracket[1], ']*\\', bracket[1]].join(''));

	function replaceToken(token, idx, str){
		//save token to res
		var refId = res.push(token.slice(1,-1));

		return '\\' + refId;
	}

	//replace paren tokens till there’s none
	while (str != prevStr) {
		prevStr = str;
		str = str.replace(pRE, replaceToken);
	}

	//save resulting str
	res.unshift(str);

	return res;
};