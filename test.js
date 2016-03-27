var assert = require('assert');
var parse = require('./parse');
var tostr = require('./stringify');
var test = require('tst');


test('no', function(){
	//no parenthesis
	var no = '汚従能載参軽無利航父構知情者博宜理格寝典。車伏社権給憶最鳴人投新意連。部波助情詳一負人倍両踏権。検治詐嘉子増気阪認保視缶最需新関日。暮常想介質能朝月再査相更断。彼見缶子料布小豊転本消能毎。今民南悪佐道供許定発試芸測五。質薄直婚秀議富投行周習新画校会知来世。性週幸日旅材費秋志活民寝済用。聞声場書詳池書探開話売師足。\n\n共域撮手行療帯忘予年来\t治平白。会献仏断表推町目読落意経願義活図人創。載曲件阿覚者極投弄作件断人改約試来。田範済無構弾野県共戻亡寄分投壊。結声属白風減区投権子美銀界?製明竹金中。日子球寂図紙展短院同政玲文崎代男集全。防作意身準関動求罪質親齢京立。革原院廃士事連浜全隆成岡。勢競官解航願下見重現測提税東意太訴百会限。';
	var noRes = [no];
	assert.deepEqual(parse(no), noRes);
	assert.equal(tostr(noRes), no);
	assert.equal(tostr(parse(no)), no);
	assert.deepEqual(parse(tostr(noRes)), noRes);
});
test('one', function(){
	//one parenthesis inside
	var one = 'a\tb\nc(d)';
	var oneRes = ['a\tb\nc(\\1)', 'd'];
	assert.deepEqual(parse(one), oneRes);
	assert.equal(tostr(oneRes), one);
	assert.equal(tostr(parse(one)), one);
	assert.deepEqual(parse(tostr(oneRes)), oneRes);
});
test('root', function(){
	//one root parenthesis
	var root = '(ا فكانت الأولى النزاع لم! وعلى إستيلاء ثم سقط, وبالرغم بالقنابل جوي في. ان الإنزال باحتلال الإعتداء حشد.\n\nبل مكن فمرّ مليون البلطيق? مع الغربي العناد لتقليعة حيث, يبق أمّا طائرات ما. انتهت النمسا فعل أم, قام لم الشمال النازية،, ما حول كانتا الشرق، معارضة. لم )';
	var rootRes = ['(\\1)', root.slice(1,-1)];
	assert.deepEqual(parse(root), rootRes);
	assert.equal(tostr(rootRes), root);
	assert.equal(tostr(parse(root)), root);
	assert.deepEqual(parse(tostr(rootRes)), rootRes);
});
test('typical', function(){
	//typical case
	var typical = 'click.super:on(:not(:nth-child(5)))'
	var typicalRes = ['click.super:on(\\3)', '5', ':nth-child(\\1)', ':not(\\2)'];
	assert.deepEqual(parse(typical), typicalRes);
	assert.equal(tostr(typicalRes), typical);
	assert.equal(tostr(parse(typical)), typical);
	assert.deepEqual(parse(tostr(typicalRes)), typicalRes);
});
test('multiple', function(){
	//multiple
	var multiple = '( a(b c(d())) x() + z((()) ) ) ';
	var multipleRes = [
			'(\\8) ',
			'',
			'd(\\1)',
			'b c(\\2)',
			'',
			'',
			'(\\5)',
			'(\\6) ',
			' a(\\3) x(\\4) + z(\\7) '
		];
	assert.deepEqual(parse(multiple), multipleRes);
	assert.equal(tostr(multipleRes), multiple);
	assert.equal(tostr(parse(multiple)), multiple);
	assert.deepEqual(parse(tostr(multipleRes)), multipleRes);
});
test('error', function(){
	//error
	var error = '((1 + 2) * 3';
	var errorRes = ['((\\1) * 3', '1 + 2'];
	assert.deepEqual(parse(error), errorRes);
	assert.equal(tostr(errorRes), error);
	assert.equal(tostr(parse(error)), error);
	assert.deepEqual(parse(tostr(errorRes)), errorRes);
});
test('dif', function(){
	//parens
	var dif = '[123[4]]';
	var difRes = ['[\\2]', '4','123[\\1]'];
	assert.deepEqual(parse(dif, '[]'), difRes);
	assert.equal(tostr(difRes), dif);
	assert.equal(tostr(parse(dif)), dif);
	assert.deepEqual(parse(tostr(difRes), '[]'), difRes);
});
test.skip('escape reference', function(){
	//escape refs
	var esc = 'a \\1 b ( 1 + 2 + \\3 + (4) ) ';
	var escRes = ['a \\\\1 b \\2 ', '4', ' 1 + 2 + \\\\3 + \\1'];
	assert.deepEqual(parse(esc), escRes);
	assert.equal(tostr(escRes), esc);
	assert.equal(tostr(parse(escape)), escape);
	assert.deepEqual(parse(tostr(escapeRes)), escapeRes);
});
test.skip('moustache', function(){
	//double
	var dbl = 'hello, {{ alex{{ pf }} }} ';
	var dblRes = ['hello, \\2', ' pf ', ' alex\\1'];
	assert.deepEqual(parse(dbl, '{{}}'), dblRes);
	assert.deepEqual(tostr(dblRes, ['{{', '}}']), dbl);
});

test('custom string point', function(){
	assert.equal(tostr(':not{\\3}', ':click :on{\\4}', '5', ' :nth-child{\\2} ', ' :not{\\3} '), ':not{ :nth-child{5} }');
});
