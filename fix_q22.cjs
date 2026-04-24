const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

const q22 = data.main.find(q => q.id === 'q22');
q22.text = q22.text.replace("聚会结束，你拆开一个用浮夸镭射纸包着的生日礼物。", "回到住处，你发现门口放着一个用浮夸镭射纸包着的无名包裹，拆开后");

fs.writeFileSync('data/questions.json', JSON.stringify(data, null, 2));
console.log('Fixed q22.');
