var	paren = require('./');
var parse = paren.parse;
var	stringify = paren.stringify;
var t = require('tape');


t('no', function(t) {
	//no parenthesis
	var no = '汚従能載参軽無利航父構知情者博宜理格寝典。車伏社権給憶最鳴人投新意連。部波助情詳一負人倍両踏権。検治詐嘉子増気阪認保視缶最需新関日。暮常想介質能朝月再査相更断。彼見缶子料布小豊転本消能毎。今民南悪佐道供許定発試芸測五。質薄直婚秀議富投行周習新画校会知来世。性週幸日旅材費秋志活民寝済用。聞声場書詳池書探開話売師足。\n\n共域撮手行療帯忘予年来\t治平白。会献仏断表推町目読落意経願義活図人創。載曲件阿覚者極投弄作件断人改約試来。田範済無構弾野県共戻亡寄分投壊。結声属白風減区投権子美銀界?製明竹金中。日子球寂図紙展短院同政玲文崎代男集全。防作意身準関動求罪質親齢京立。革原院廃士事連浜全隆成岡。勢競官解航願下見重現測提税東意太訴百会限。';
	var noRes = [no];
	t.deepEqual(parse(no), noRes);
	t.equal(stringify(noRes), no);
	t.equal(stringify(parse(no)), no);
	t.deepEqual(parse(stringify(noRes)), noRes);
	t.end()
});
t('one', function(t) {
	//one parenthesis inside
	var one = 'a\tb\nc(d)e';
	var oneRes = ['a\tb\nc(', ['d'], ')e'];
	t.deepEqual(paren(one), oneRes);
	t.equal(stringify(oneRes), one);
	t.equal(stringify(paren(one)), one);
	t.deepEqual(paren(stringify(oneRes)), oneRes);
	t.end()
});
t('root', function(t) {
	//one root parenthesis
	var root = '(ا فكانت الأولى النزاع لم! وعلى إستيلاء ثم سقط, وبالرغم بالقنابل جوي في. ان الإنزال باحتلال الإعتداء حشد.\n\nبل مكن فمرّ مليون البلطيق? مع الغربي العناد لتقليعة حيث, يبق أمّا طائرات ما. انتهت النمسا فعل أم, قام لم الشمال النازية،, ما حول كانتا الشرق، معارضة. لم )';
	var rootRes = ['(', [root.slice(1,-1)],')'];
	t.deepEqual(paren(root), rootRes);
	t.equal(stringify(rootRes), root);
	t.equal(stringify(paren(root)), root);
	t.deepEqual(paren(stringify(rootRes)), rootRes);
	t.end()
});
t('typical', function(t) {
	//typical case
	var typical = 'click.super:on(:not(:nth-child(5)))'
	var typicalRes = ['click.super:on(', [':not(', [':nth-child(', ['5'] , ')'] ,')'] ,')'];
	t.deepEqual(paren(typical), typicalRes);
	t.equal(stringify(typicalRes), typical);
	t.equal(stringify(paren(typical)), typical);
	t.deepEqual(paren(stringify(typicalRes)), typicalRes);
	t.end()
});
t('multiple', function(t) {
	//multiple
	var multiple = '( a(b c(d())) x() + z((()) ) ) ';
	var multipleRes = ['(', [
			' a(', ['b c(', ['d(', [''], ')'],')',] ,') x(', [''], ') + z(', ['(', [ '(', [''], ')'] , ') '],') '
		], ') '];
	t.deepEqual(paren(multiple), multipleRes);
	t.equal(stringify(multipleRes), multiple);
	t.equal(stringify(paren(multiple)), multiple);
	t.deepEqual(paren(stringify(multipleRes)), multipleRes);
	t.end()
});
t('error', function(t) {
	//error
	var error = '((1 + 2) * 3';
	var errorRes = ['((', ['1 + 2'] ,') * 3'];
	t.deepEqual(paren(error), errorRes);
	t.equal(stringify(errorRes), error);
	t.equal(stringify(paren(error)), error);
	t.deepEqual(paren(stringify(errorRes)), errorRes);
	t.end()
});
t('dif', function(t) {
	//parens
	var dif = '[123[4]]';
	var difRes = ['[', ['123[', ['4'] ,']'] ,']'];
	t.deepEqual(paren(dif), difRes);
	t.equal(stringify(difRes), dif);
	t.equal(stringify(paren(dif)), dif);
	t.deepEqual(paren(stringify(difRes), '[]'), difRes);
	t.end()
});
t.skip('escape reference', function(t) {
	//escape refs
	var esc = 'a $1 b ( 1 + 2 + $3 + (4) ) ';
	var escRes = ['a \\\\1 b \\2 ', '4', ' 1 + 2 + \\\\3 + \\1'];
	t.deepEqual(parse(esc), escRes);
	t.equal(stringify(escRes), esc);
	t.equal(stringify(parse(escape)), escape);
	t.deepEqual(parse(stringify(escapeRes)), escapeRes);
	t.end()
});
t.skip('moustache', function(t) {
	//double
	var dbl = 'hello, {{ alex{{ pf }} }} ';
	var dblRes = ['hello, \\2', ' pf ', ' alex\\1'];
	t.deepEqual(parse(dbl, '{{}}'), dblRes);
	t.deepEqual(stringify(dblRes, ['{{', '}}']), dbl);
	t.end()
	t.end()
});


t('options', function (t) {
	t.deepEqual(paren('a(b[c{d}])', {
		brackets: ['{}', '[]', '()'],
		escape: '___',
		flat: true
	}), ['a(___3)', 'd', 'c{___1}', 'b[___2]']);
	t.deepEqual(paren('a(b[c{d}])', {
		brackets: ['()'],
		escape: '\\',
		flat: true
	}), ['a(\\1)', 'b[c{d}]']);
	t.end()
});

t('same brackets', function (t) {
	t.deepEqual(parse('abc "def" ghi', '""'), ['abc "', ['def'], '" ghi'])
	t.end()
});

t('flat', function (t) {
	var typical = 'click.super:on(:not(:nth-child(5)))'
	var typicalRes = ['click.super:on(\\3)', '5', ':nth-child(\\1)', ':not(\\2)'];
	t.deepEqual(parse(typical, {flat: true, escape: '\\'}), typicalRes);
	t.equal(typical, stringify(typicalRes, {flat: true, escape: '\\'}));
	t.end()
});

t('error flat', function (t) {
	t.throws( function (t) {
		// console.log(stringify(['___2'], {flat: true, escape: '___'}))
		stringify(['___5', ''], {flat: true, escape: '___'})
	});
	t.end()
});

t('too many idx', function (t) {
	var src = '((((a) < (b) ? (a) : (b))) < (c) ? (((a) < (b) ? (a) : (b))) : (c))';
	var res = ["x15", "a", "b", "a", "b", "(x1) < (x2) ? (x3) : (x4)", "(x5)", "c", "a", "b", "a", "b", "(x8) < (x9) ? x10 : x11", "x12", "c", "(x6) < (x7) ? x13 : x14"];
	t.deepEqual(parse(src, {flat: true, escape: 'x'}), res);
	t.end()
});
