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
module.exports = function (str, brackets) {
	//pretend non-string parsed per-se
	if (typeof str !== 'string') return [str];

	var res = [str];

	var brackets = brackets ? (Array.isArray(brackets) ? brackets : [brackets]) : ['{}', '[]', '()']

	brackets.forEach(function (bracket) {
		//create parenthesis regex
		var pRE = new RegExp(['\\', bracket[0], '[^\\', bracket[0], '\\', bracket[1], ']*\\', bracket[1]].join(''));

		var ids = [];

		function replaceToken(token, idx, str){
			//save token to res
			var refId = res.push(token.slice(bracket[0].length, -bracket[1].length)) - 1;

			ids.push(refId);

			return '\\' + refId;
		}

		res.forEach(function (str, i) {
			var prevStr;

			//replace paren tokens till there’s none
			var a = 0;
			while (str != prevStr) {
				prevStr = str;
				str = str.replace(pRE, replaceToken);
				if (a++ > 10e3) throw Error('References have circular dependency. Please, check them.')
			}

			res[i] = str;
		});

		//wrap found refs to brackets
		res = res.map(function (str) {
			ids.forEach(function (id) {
				str = str.replace(new RegExp('(\\\\' + id + ')', 'g'), bracket[0] + '$1' + bracket[1])
			});
			return str;
		});
	});

	return res;
};