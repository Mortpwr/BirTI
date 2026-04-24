const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

// Filter out q15 and q28
const newMain = data.main.filter(q => q.id !== 'q15' && q.id !== 'q28');

// Re-index
newMain.forEach((q, index) => {
  q.id = `q${index + 1}`;
});

// Update special
data.special[0].id = 'lotus_gate_q30';

data.main = newMain;

fs.writeFileSync('data/questions.json', JSON.stringify(data, null, 2));
console.log('Done processing questions.');
