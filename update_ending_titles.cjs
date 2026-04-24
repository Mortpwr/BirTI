const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/types.json', 'utf8'));

// 1. HARDCORE
data.standard[0].cn = "【过载的频段】";
data.standard[0].desc = data.standard[0].desc.replace("灰域的阳极舞者", "过载的频段");

// 2. NIGHTWATCH
data.standard[1].cn = "【绝缘的防波堤】";
data.standard[1].desc = data.standard[1].desc.replace("阈限空间的守夜人", "绝缘的防波堤");

// 3. GHOST
data.standard[2].cn = "【环路上的盲点】";
data.standard[2].desc = data.standard[2].desc.replace("环形公路的幽灵", "环路上的盲点");

// 4. WANDERER
data.standard[3].cn = "【接触不良的火花】";
data.standard[3].desc = data.standard[3].desc.replace("电路板上的拾荒者", "接触不良的火花");

// 5. FAKE_END
data.special[0].cn = "【无痛的白噪音】";
data.special[0].desc = data.special[0].desc.replace("永无止境的塑料派对", "无痛的白噪音");

// 6. TRUE_END
data.special[1].cn = "【真实的下坠感】";
data.special[1].desc = data.special[1].desc.replace("灰域边缘的残渣", "真实的下坠感");

fs.writeFileSync('data/types.json', JSON.stringify(data, null, 2));
console.log('Updated ending titles.');
