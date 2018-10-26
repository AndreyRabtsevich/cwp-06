const logF = require('./logfile.json');

module.exports.log=function log(file, url, data) {
    console.log("done!");
    const current = new Date();
    let info = {
        date: (current.getDay() + 1) + '.' + (current.getMonth() + 1) + '.' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds(),
        url: url,
        data: JSON.stringify(data)
    };
    logF.push(info);
    require('fs').createWriteStream('logfile.json').write(JSON.stringify(logF));
}