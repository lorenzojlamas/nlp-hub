var fs = require('fs');

module.exports = {
    getApps: function () {        
        return JSON.parse(fs.readFileSync('../apps.json', 'utf8'));
    }
}