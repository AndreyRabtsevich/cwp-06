const log = require('./log');
const ascOrder = 'asc';
const descOrder = 'desc';
let articles = require('./articles.json');
let sortedArticles = {};
let err = { error: '400', errorText: 'Invalid request' };

module.exports.readAll = function readAll(req, res, payload, cb) {
    if (payload === undefined) {
        payload = {
            sortField: 'date',
            sortOrder: 'desc',
            page: 1,
            limit: 10,
            includeDeps: false
        }
    }
    else {
        if (payload.sortField === undefined)
            payload.sortField = 'date';
        if (payload.sortOrder === undefined)
            payload.sortOrder = 'desc';
        if (payload.includeDeps === undefined)
            payload.includeDeps = false;
    }
    sortedArticles = articles.slice();
    switch (payload.sortField) {
        case 'id':
            sortArticle(payload, (a, b) => {
                return a.id - b.id;
            })
            break;
        case 'title':
            sortOrd(payload, (a, b) => {
                a.title.localeCompare(b.title);
            })
            break;
        case 'text':
            sortArticle(payload, (a, b) => {
                a.text.localeCompare(b.text);
            })
            break;
        case 'date':
            sortArticle(payload, (a, b) => {
                let myDateA = a.date.split('-');
                let myDateB = b.date.split('-');
                let dateA = new Date(parseInt(myDateA[2]), parseInt(myDateA[1]), parseInt(myDateA[0]));
                let dateB = new Date(parseInt(myDateB[2]), parseInt(myDateB[1]), parseInt(myDateB[0]));
                return dateA - dateB;
            })
            break;
        case 'author':
            sortArticle(payload, (a, b) => {
                a.author.localeCompare(b.author);
            })
            break;
        default:
            cb(err);
            return;
    }
    if (payload.includeDeps === false) {
        sortedArticles = sortedArticles.map((element) => {
            let obj = Object.assign({}, element);
            delete obj.comments;
            return obj;
        });
    }
    let newArticle = { items: sortedArticles, meta: { page: 1, pages: 0, count: articles.length, limit: 10 } };
    if (payload.page !== undefined) {
        newArticle.meta.page = payload.page;
    }
    if (payload.limit !== undefined) {
        newArticle.meta.limit = payload.limit;
    }
    newArticle.meta.pages = Math.ceil(newArticle.meta.count / newArticle.meta.limit);
    newArticle.items = newArticle.items.splice((newArticle.meta.page - 1) * newArticle.meta.limit, newArticle.meta.limit * newArticle.meta.page);
    log.log(null, '/api/articles/readall', payload);
    cb(null, newArticle);
}

function sortArticle(payload, func) {
    sortedArticles.sort(func);
    if (payload.sortOrder === descOrder) {
        sortedArticles.reverse();
    }
}