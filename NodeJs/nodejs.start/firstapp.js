// firstapp.js

var http = require('http');
var id = 1;
http.createServer(function(request,response){
  response.writeHead(200,{'content-type':'text/html'});
  response.write('<h1>My First Node.js App.</h1>');
  response.end('welcome to Node.js');
  console.log('changed'+id);
  id++;
}).listen(10000);
console.log('HTTP SERVER IS LISTENING AT PORT 10000.');