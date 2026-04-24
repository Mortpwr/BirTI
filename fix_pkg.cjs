const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.predeploy = "npm run build";
pkg.scripts.deploy = "gh-pages -d dist";
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
