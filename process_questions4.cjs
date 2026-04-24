const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

// Filter out q19 and q20
const newMain = data.main.filter(q => q.id !== 'q19' && q.id !== 'q20');

// Re-index
newMain.forEach((q, index) => {
  q.id = `q${index + 1}`;
});

// Update special ID
data.special[0].id = `lotus_gate_q${newMain.length + 1}`;

data.main = newMain;

fs.writeFileSync('data/questions.json', JSON.stringify(data, null, 2));
console.log('Done processing questions.');
