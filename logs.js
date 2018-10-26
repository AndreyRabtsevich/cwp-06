module.exports.logs = function logs(req, res, payload, cb){
    let data = require('./logfile.json');
    cb(null, JSON.stringify(data));
}