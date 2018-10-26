let articles = require('./articles.json');
const log = require('./log');
const file = require('fs').createWriteStream('./logfile.log');
function deleteArticle(req, res, payload, cb) {
    const index = articles.findIndex(article => article.id == payload.id);
    if (index > -1) {
        articles.splice(index, 1);
        log.log(file, '/api/articles/delete', payload);
        cb(null, 'article deleted');
    }
    else {
        cb('error');
    }
}
exports.deleteArticle = deleteArticle;