var assert = require('assert');
var paren = require('./');

/** testing sets */

//no parenthesis
var no = '汚従能載参軽無利航父構知情者博宜理格寝典。車伏社権給憶最鳴人投新意連。部波助情詳一負人倍両踏権。検治詐嘉子増気阪認保視缶最需新関日。暮常想介質能朝月再査相更断。彼見缶子料布小豊転本消能毎。今民南悪佐道供許定発試芸測五。質薄直婚秀議富投行周習新画校会知来世。性週幸日旅材費秋志活民寝済用。聞声場書詳池書探開話売師足。\n\n共域撮手行療帯忘予年来\t治平白。会献仏断表推町目読落意経願義活図人創。載曲件阿覚者極投弄作件断人改約試来。田範済無構弾野県共戻亡寄分投壊。結声属白風減区投権子美銀界?製明竹金中。日子球寂図紙展短院同政玲文崎代男集全。防作意身準関動求罪質親齢京立。革原院廃士事連浜全隆成岡。勢競官解航願下見重現測提税東意太訴百会限。';
var noRes = [no];

//one parenthesis inside
var one = 'नुवादक सार्वजनिक जाता. गटको तरीके आवश्यक पहोचने परिभाषित. सहयोग नीचे पुस्तक ब्रौशर बीसबतेबोध कलइस तरीके वर्णित\t परिभाषित निर्माता स्थापित विकासक्षमता देखने वर्ष! एसलिये दुनिया सुनत जिसकी जाएन मुश्किल दस्तावेज समजते.\n\nकरता। पसंद लक्ष्य समस्याओ कीसे वर्तमान व्यवहार लक्षण! खरिदे दस्त(ावेज व्रुद्धि सुस्पश्ट सकते बनाए सक्षम सोफ़तवेर वास्तविक. ध्वनि बेंगलूर करकेविशेष अतित तकरीब?न कार्यलय दस्तावेज करने सदस्य! नयेलिए असक्षम अन्तरराष्ट्रीयकरन बाटते जाता कीने पुस्तक कम्प्युटर उन्हे)';
var oneRes = ['नुवादक सार्वजनिक जाता. गटको तरीके आवश्यक पहोचने परिभाषित. सहयोग नीचे पुस्तक ब्रौशर बीसबतेबोध कलइस तरीके वर्णित\t परिभाषित निर्माता स्थापित विकासक्षमता देखने वर्ष! एसलिये दुनिया सुनत जिसकी जाएन मुश्किल दस्तावेज समजते.\n\nकरता। पसंद लक्ष्य समस्याओ कीसे वर्तमान व्यवहार लक्षण! खरिदे दस्त\\1', 'ावेज व्रुद्धि सुस्पश्ट सकते बनाए सक्षम सोफ़तवेर वास्तविक. ध्वनि बेंगलूर करकेविशेष अतित तकरीब?न कार्यलय दस्तावेज करने सदस्य! नयेलिए असक्षम अन्तरराष्ट्रीयकरन बाटते जाता कीने पुस्तक कम्प्युटर उन्हे'];

//one root parenthesis
var root = '(ا فكانت الأولى النزاع لم! وعلى إستيلاء ثم سقط, وبالرغم بالقنابل جوي في. ان الإنزال باحتلال الإعتداء حشد.\n\nبل مكن فمرّ مليون البلطيق? مع الغربي العناد لتقليعة حيث, يبق أمّا طائرات ما. انتهت النمسا فعل أم, قام لم الشمال النازية،, ما حول كانتا الشرق، معارضة. لم )';
var rootRes = ['\\1', root.slice(1,-1)];

//typical case
var typical = 'click.super:on(:not(:nth-child(5)))'
var typicalRes = ['click.super:on\\3', '5', ':nth-child\\1', ':not\\2'];

//multiple
var multiple = '( a(b c(d())) x() + z((()) ) ) ';
var multipleRes = [
		'\\8 ',
		'',
		'd\\1',
		'b c\\2',
		'',
		'',
		'\\5',
		'\\6 ',
		' a\\3 x\\4 + z\\7 '
	];

//error
var error = '((1 + 2) * 3';
var errorRes = ['(\\1 * 3', '1 + 2'];

//parens
var dif = '[123[4]]';
var difRes = ['\\2', '4','123\\1'];


//escape refs
var esc = 'a \\1 b ( 1 + 2 + \\3 + (4) ) ';
var escRes = ['a \\\\1 b \\2 ', '4', ' 1 + 2 + \\\\3 + \\1'];



describe('parse', function(){
	it('no parenthesis', function(){
		assert.deepEqual(paren(no), noRes);
	});
	it('one parenthesis', function(){
		assert.deepEqual(paren(one), oneRes);
	});
	it('root parenthesis', function(){
		assert.deepEqual(paren(root), rootRes);
	});
	it('typical parenthesis', function(){
		assert.deepEqual(paren(typical), typicalRes);
	});
	it('multiple parenthesis', function(){
		assert.deepEqual(paren(multiple), multipleRes);
	});
	it('error parenthesis', function(){
		assert.deepEqual(paren(multiple), multipleRes);
	});
	it('dif parenthesis', function(){
		assert.deepEqual(paren(dif, '[]'), difRes);
	});
	it.skip('escape reference', function(){
		assert.deepEqual(paren(esc), escRes);
	});
});

describe('stringify', function(){
	it('no parenthesis', function(){
		assert.equal(paren(noRes), no);
	});
	it('one parenthesis', function(){
		assert.equal(paren(oneRes), one);
	});
	it('root parenthesis', function(){
		assert.equal(paren(rootRes), root);
	});
	it('typical parenthesis', function(){
		assert.equal(paren(typicalRes), typical);
	});
	it('multiple parenthesis', function(){
		assert.equal(paren(multipleRes), multiple);
	});
	it('error parenthesis', function(){
		assert.equal(paren(errorRes), error);
	});
	it('dif parenthesis', function(){
		assert.equal(paren(difRes, '[]'), dif);
	});
	it.skip('escape reference', function(){
		assert.equal(paren(escRes), esc);
	});
});


describe('both ways', function(){
	it('no parenthesis', function(){
		assert.equal(paren(paren(no)), no);
		assert.deepEqual(paren(paren(noRes)), noRes);
	});
	it('one parenthesis', function(){
		assert.equal(paren(paren(one)), one);
		assert.deepEqual(paren(paren(oneRes)), oneRes);
	});
	it('root parenthesis', function(){
		assert.equal(paren(paren(root)), root);
		assert.deepEqual(paren(paren(rootRes)), rootRes);
	});
	it('typical parenthesis', function(){
		assert.equal(paren(paren(typical)), typical);
		assert.deepEqual(paren(paren(typicalRes)), typicalRes);
	});
	it('multiple parenthesis', function(){
		assert.equal(paren(paren(multiple)), multiple);
		assert.deepEqual(paren(paren(multipleRes)), multipleRes);
	});
	it('error parenthesis', function(){
		assert.equal(paren(paren(error)), error);
		assert.deepEqual(paren(paren(errorRes)), errorRes);
	});
	it('dif parenthesis', function(){
		assert.equal(paren(paren(dif, '[]'), '[]'), dif);
		assert.deepEqual(paren(paren(difRes, '[]'), '[]'), difRes);
	});
	it.skip('escape reference', function(){
		assert.equal(paren(paren(escape)), escape);
		assert.deepEqual(paren(paren(escapeRes)), escapeRes);
	});
});