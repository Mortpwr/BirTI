const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

// Update q22
const q22 = data.main.find(q => q.id === 'q22');
q22.text = "【21:30 盲音】你路过一个早已废弃的公用电话亭。听筒垂在半空中，像一个上吊的人。当你走近时，听筒里传来断断续续的电流声，夹杂着一段被严重扭曲的、类似于生日快乐歌的合成器旋律。";
q22.options = [
  { "label": "拿起听筒，紧紧贴在耳边。你清醒地试图在电流的缝隙中，捕捉那个被困在电路里的微弱信号。", "value": 3 },
  { "label": "停下脚步听了一会儿。这不过是线路老化产生的随机频段，你耸耸肩，继续往前走。", "value": 2 },
  { "label": "感到一阵莫名的烦躁。你走上前，把听筒重重地砸回座机上，切断了这诡异的声源。", "value": 1 }
];

// Update special
const q25 = data.special[0];
q25.text = "【00:01 录音】零点已过。电话亭里的那段电流声并没有消失，它在你脑海的深处重新连接。杂音褪去，一个没有任何起伏的、仿佛来自你自身潜意识的合成语音响起：“系统检测到您的情绪阈值已达临界。是否格式化当前所有痛觉记忆，并永久循环完美的一天？”";
q25.options = [
  { "label": "闭上眼，选择格式化。（让意识溶解在无痛的白噪音里，去往那个永远不会结束的虚假派对）", "value": "FAKE_END" },
  { "label": "睁开眼，强行切断连接。（你宁愿带着这些坏死的记忆在废墟里腐烂，也不要那种被阉割的快乐）", "value": "TRUE_END" }
];

fs.writeFileSync('data/questions.json', JSON.stringify(data, null, 2));
console.log('Updated q22 and special question.');
