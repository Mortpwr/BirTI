const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/types.json', 'utf8'));
data.special[1].desc = data.special[1].desc.replace("拒绝成为残渣", "拒绝这种下坠感");
fs.writeFileSync('data/types.json', JSON.stringify(data, null, 2));
