var fs = require('fs');

module.exports = {
    getApps: function () {
        var path = require('path');
        var root = path.dirname(require.main.filename);

        return JSON.parse(fs.readFileSync(`${root}/../apps.json`, 'utf8'));
    }
}