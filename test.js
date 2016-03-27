var assert = require('assert');
var	paren = require('./');
var parse = paren.parse;
var	stringify = paren.stringify;
var test = require('tst');


test('no', function(){
	//no parenthesis
	var no = '汚従能載参軽無利航父構知情者博宜理格寝典。車伏社権給憶最鳴人投新意連。部波助情詳一負人倍両踏権。検治詐嘉子増気阪認保視缶最需新関日。暮常想介質能朝月再査相更断。彼見缶子料布小豊転本消能毎。今民南悪佐道供許定発試芸測五。質薄直婚秀議富投行周習新画校会知来世。性週幸日旅材費秋志活民寝済用。聞声場書詳池書探開話売師足。\n\n共域撮手行療帯忘予年来\t治平白。会献仏断表推町目読落意経願義活図人創。載曲件阿覚者極投弄作件断人改約試来。田範済無構弾野県共戻亡寄分投壊。結声属白風減区投権子美銀界?製明竹金中。日子球寂図紙展短院同政玲文崎代男集全。防作意身準関動求罪質親齢京立。革原院廃士事連浜全隆成岡。勢競官解航願下見重現測提税東意太訴百会限。';
	var noRes = [no];
	assert.deepEqual(parse(no), noRes);
	assert.equal(stringify(noRes), no);
	assert.equal(stringify(parse(no)), no);
	assert.deepEqual(parse(stringify(noRes)), noRes);
});
test('one', function(){
	//one parenthesis inside
	var one = 'a\tb\nc(d)e';
	var oneRes = ['a\tb\nc(', ['d'], ')e'];
	assert.deepEqual(paren(one), oneRes);
	assert.equal(stringify(oneRes), one);
	assert.equal(stringify(paren(one)), one);
	assert.deepEqual(paren(stringify(oneRes)), oneRes);
});
test('root', function(){
	//one root parenthesis
	var root = '(ا فكانت الأولى النزاع لم! وعلى إستيلاء ثم سقط, وبالرغم بالقنابل جوي في. ان الإنزال باحتلال الإعتداء حشد.\n\nبل مكن فمرّ مليون البلطيق? مع الغربي العناد لتقليعة حيث, يبق أمّا طائرات ما. انتهت النمسا فعل أم, قام لم الشمال النازية،, ما حول كانتا الشرق، معارضة. لم )';
	var rootRes = ['(', [root.slice(1,-1)],')'];
	assert.deepEqual(paren(root), rootRes);
	assert.equal(stringify(rootRes), root);
	assert.equal(stringify(paren(root)), root);
	assert.deepEqual(paren(stringify(rootRes)), rootRes);
});
test('typical', function(){
	//typical case
	var typical = 'click.super:on(:not(:nth-child(5)))'
	var typicalRes = ['click.super:on(', [':not(', [':nth-child(', ['5'] , ')'] ,')'] ,')'];
	assert.deepEqual(paren(typical), typicalRes);
	assert.equal(stringify(typicalRes), typical);
	assert.equal(stringify(paren(typical)), typical);
	assert.deepEqual(paren(stringify(typicalRes)), typicalRes);
});
test('multiple', function(){
	//multiple
	var multiple = '( a(b c(d())) x() + z((()) ) ) ';
	var multipleRes = ['(', [
			' a(', ['b c(', ['d(', [''], ')'],')',] ,') x(', [''], ') + z(', ['(', [ '(', [''], ')'] , ') '],') '
		], ') '];
	assert.deepEqual(paren(multiple), multipleRes);
	assert.equal(stringify(multipleRes), multiple);
	assert.equal(stringify(paren(multiple)), multiple);
	assert.deepEqual(paren(stringify(multipleRes)), multipleRes);
});
test('error', function(){
	//error
	var error = '((1 + 2) * 3';
	var errorRes = ['((', ['1 + 2'] ,') * 3'];
	assert.deepEqual(paren(error), errorRes);
	assert.equal(stringify(errorRes), error);
	assert.equal(stringify(paren(error)), error);
	assert.deepEqual(paren(stringify(errorRes)), errorRes);
});
test('dif', function(){
	//parens
	var dif = '[123[4]]';
	var difRes = ['[', ['123[', ['4'] ,']'] ,']'];
	assert.deepEqual(paren(dif), difRes);
	assert.equal(stringify(difRes), dif);
	assert.equal(stringify(paren(dif)), dif);
	assert.deepEqual(paren(stringify(difRes), '[]'), difRes);
});
test.skip('escape reference', function(){
	//escape refs
	var esc = 'a $1 b ( 1 + 2 + $3 + (4) ) ';
	var escRes = ['a \\\\1 b \\2 ', '4', ' 1 + 2 + \\\\3 + \\1'];
	assert.deepEqual(parse(esc), escRes);
	assert.equal(stringify(escRes), esc);
	assert.equal(stringify(parse(escape)), escape);
	assert.deepEqual(parse(stringify(escapeRes)), escapeRes);
});
test.skip('moustache', function(){
	//double
	var dbl = 'hello, {{ alex{{ pf }} }} ';
	var dblRes = ['hello, \\2', ' pf ', ' alex\\1'];
	assert.deepEqual(parse(dbl, '{{}}'), dblRes);
	assert.deepEqual(stringify(dblRes, ['{{', '}}']), dbl);
});

test('options', function () {
	assert.deepEqual(paren('a(b[c{d}])', {
		brackets: ['{}', '[]', '()'],
		escape: '___',
		flat: true
	}), ['a(___3)', 'd', 'c{___1}', 'b[___2]']);
	assert.deepEqual(paren('a(b[c{d}])', {
		brackets: ['()'],
		escape: '\\',
		flat: true
	}), ['a(\\1)', 'b[c{d}]']);
});