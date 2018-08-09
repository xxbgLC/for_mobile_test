const http = require('http');
const fs = require('fs');
const os = require('os')

var server = http.createServer();
var port = 4567
var hostName = getLoaclIP()

var handlerequest = (request, respone) => {
  var url = request.url;
  if (url == '/') {
    respone.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./index.html',(err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      respone.end(data);
    });
  } else if (url != '/') {
    var ourl = '.' + url;
    var type = ourl.substr(ourl.lastIndexOf(".") + 1, ourl.length)
    respone.writeHead(200, { 'Content-type': "text/" + type });
    fs.readFile(ourl, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      respone.end(data);
    });
  }
}
server.on('request', handlerequest);

server.listen(port, hostName, () => {
  console.log(`runing at http://${hostName}:${port}`);
})

// 获取本地ip
function getLoaclIP() {
  let ipObj = os.networkInterfaces();
  let IPv4 = [];
  Object.keys(ipObj).forEach(ele => {
    ipObj[ele].forEach(ip => {
      if (ip.family === 'IPv4') {
        IPv4.push(ip.address);
      }
    })
  });
  return IPv4[0]
}