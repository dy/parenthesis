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
module.exports = function (str, bracket) {
	//pretend non-string parsed per-se
	if (typeof str !== 'string') return [str];

	var res = [], prevStr;

	bracket = bracket || '()';

	//create parenthesis regex
	var pRE = new RegExp(['\\', bracket[0], '[^\\', bracket[0], '\\', bracket[1], ']*\\', bracket[1]].join(''));

	function replaceToken(token, idx, str){
		//save token to res
		var refId = res.push(token.slice(bracket[0].length, -bracket[1].length));

		return '\\' + refId;
	}

	//replace paren tokens till there’s none
	var a = 0;
	while (str != prevStr) {
		prevStr = str;
		str = str.replace(pRE, replaceToken);
		if (a++ > 10e3) throw Error('References have circular dependency. Please, check them.')
	}

	//save resulting str
	res.unshift(str);

	//wrap found refs to brackets
	res = res.map(function (str) {
		return str.replace(/(\\[0-9]+)/g, bracket[0] + '$1' + bracket[1]);
	});

	return res;
};