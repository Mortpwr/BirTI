const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

// Filter out q14 and q19
const newMain = data.main.filter(q => q.id !== 'q14' && q.id !== 'q19');

// Re-index
newMain.forEach((q, index) => {
  q.id = `q${index + 1}`;
});

// Update special ID
data.special[1].id = `lotus_gate_q${newMain.length + 1}`;

data.main = newMain;

fs.writeFileSync('data/questions.json', JSON.stringify(data, null, 2));
console.log('Done processing questions.');
