var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

var dls = [];
var blacklist = [ 'one-time-download.js' ];
var whitelistRegexp = process.argv.length > 1 ? new RegExp(process.argv[2]) : /.*/
var files = fileSystem.readdirSync(__dirname)
  .filter(function (file) {
    return blacklist.indexOf(file) === -1;
  })
  .filter(function (file) {
    return file.match(whitelistRegexp);
  })
  .sort();
console.log('Exposing file(s) "' + files.join(', ') + '" for one-time download');

function getIndex(url) {
  var match;
  url = url.replace('/', '');
  if (files.indexOf(url) > -1) {
    return files.indexOf(url);
  } else {
    match = url.match(/\d+/);
    if (match && match.length) {
      return parseInt(match[0], 10);
    }
  }
}

function getFilePath(index) {
  return __dirname + '/' + files[index];
}

http.createServer(function(req, res){
  var index = getIndex(req.url);
  console.log(req.headers['user-agent'] + ' ' + req.connection.remoteAddress + ' ' + req.url + ' ' + (files[index] || 'Unable to resolve file'));
  
  if (typeof index === 'undefined' || dls.indexOf(index) > -1 || index >= files.length) {
    res.writeHead(403, {'Content-Type': 'text/plain'});
    res.end('None shall pass');
  } else {
    dls.push(index);

    var filePath = getFilePath(index);
    console.log('Resolved to file ' + filePath);
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': fileSystem.statSync(filePath)
    });

    fileSystem.createReadStream(filePath).pipe(res);
  }
}).listen(4322);
