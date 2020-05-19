const http = require('http');
const app = require('./app');

//if not set use 3000 as deafult port
const port = process.env.PORT || 3000;

//need to pass a listener
const server = http.createServer(app);

//starts listening on this port
server.listen(port);