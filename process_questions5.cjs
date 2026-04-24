const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

// 1. Rewrite q14
const q14 = data.main.find(q => q.id === 'q14');
q14.text = "【15:30 盆栽】走廊的死角里，一盆落满灰尘的塑料绿植正以一种令人作呕的完美姿态“活着”。它不需要水，也不会枯萎，永远保持着这种虚假、僵硬的绿色。你路过它时：";
q14.options = [
  { "label": "产生了一种难以遏制的冲动，想要掏出打火机点燃它的叶片，或者直接把它连根拔起，看看它融化、扭曲时的丑陋真相。", "value": 3 },
  { "label": "停下来，用手指弹了一下僵硬的叶片，听着那声沉闷、空洞的塑料回音，然后面无表情地走开。", "value": 2 },
  { "label": "感到一阵悲哀。在这个被效率和绩效填满的混凝土盒子里，连植物都被剥夺了死亡的权利。", "value": 1 }
];

// 2. Move q21 to special
const q21Index = data.main.findIndex(q => q.id === 'q21');
const q21 = data.main.splice(q21Index, 1)[0];
data.special.unshift(q21); // Put it at the beginning of special

// 3. Re-index main questions
data.main.forEach((q, index) => {
  q.id = `q${index + 1}`;
});

// 4. Update special IDs
data.special[0].id = 'food_court_q'; // This is the old q21
data.special[1].id = `lotus_gate_q${data.main.length + 1}`; // This is the hidden ending question

fs.writeFileSync('data/questions.json', JSON.stringify(data, null, 2));
console.log('Done processing questions.');
