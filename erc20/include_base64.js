const fs = require('fs');
const file = process.argv[2];
const match = require('./match_include_base64');
const lines = String(fs.readFileSync(file)).split('\n').map(line => {
    let res = match(line);
    if (res != null) {
        const data = fs.readFileSync(res[1].replace(/'/g, ''), 'base64');
        line = line.replace(res[0], JSON.stringify(data));
    }
    return line;
});
fs.writeFileSync(file.replace('.ts', '.m.ts'), lines.join('\n'), { flag: 'w+' });
