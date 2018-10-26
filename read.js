let articles = require('./articles.json');
const log = require('./log');
const file = require('fs').createWriteStream('./logfile.log');
function read(req, res, payload, cb) {
    let article = articles.find(article => article.id == payload.id);
    if (article) {
        log.log(file, '/api/articles/read', payload);
        cb(null, article);
    }
    else {
        cb('error');
    }
}
exports.read = read;