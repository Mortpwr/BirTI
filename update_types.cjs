const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/types.json', 'utf8'));

// END-HARDCORE
data.standard[0].desc = data.standard[0].desc.replace("那这朵劣质的电子莲花就是你唯一的真理", "那这段被困在电路里的录音就是你唯一的真理");

// END-NIGHTWATCH
data.standard[1].desc = data.standard[1].desc.replace("你踩碎了电子莲花的发声器", "你重重地砸下了公用电话的听筒");

// END-GHOST
data.standard[2].desc = data.standard[2].desc.replace("你伴着垃圾桶里断断续续的 8-bit 音乐平静地睡去", "你伴着脑海中残留的合成器盲音平静地睡去");

// FAKE_END
data.special[0].desc = data.special[0].desc.replace("电子莲花的音乐变成了世界上最美妙的交响乐。", "那段扭曲的合成器旋律变成了世界上最美妙的交响乐。");

// TRUE_END
data.special[1].desc = data.special[1].desc.replace("“吧嗒。”你硬生生拔掉了纽扣电池。一段录音被困在电路里——现在，它彻底死寂了。", "“咔哒。”你强行切断了脑海中的连接。那段被困在电路里的录音——现在，彻底死寂了。");

fs.writeFileSync('data/types.json', JSON.stringify(data, null, 2));
console.log('Updated types.json.');
