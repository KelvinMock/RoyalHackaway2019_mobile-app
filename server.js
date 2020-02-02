// // google hello world node case
//
// 'use strict';
// const express = require('express');
// const app = express();
// var path = require('path');
//
// app.use("/styles",  express.static(path.join(__dirname + '/RoyalHackaway2019_mobile-app/style.css')));
// app.use("/scripts", express.static(__dirname + '/RoyalHackaway2019_mobile-app/sketch.js'));
//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
//   // res.status(200).send('Hello, world!');
// });
// // [END hello_world]
//
// if (module === require.main) {
// // [START server]
// // Start the server
// const server = app.listen(process.env.PORT || 8080, () => {
//   const port = server.address().port;
//   console.log(`App listening on port ${port}`);
// });
// // [END server]
// }
//
// module.exports = app;

////////////////////////////////
//
// HTTP Portion
var http = require('http');
// Path module
var path = require('path');

// Using the filesystem module
var fs = require('fs');

var server = http.createServer(handleRequest);

// server.listen(8080);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

console.log('Server started on port 8080');

function handleRequest(req, res) {
  // What did we request?
  var pathname = req.url;
  // pathname = '/views/index.html';

  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/views/start.html';
  }

  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };
  // What is it?  Default to plain text

  var contentType = typeExt[ext] || 'text/plain';

  // User file system module
  fs.readFile(__dirname + pathname,
    // Callback function for reading
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}
