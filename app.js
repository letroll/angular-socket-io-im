
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  socket = require('./routes/socket.js'),
  http   = require('http'),
  path   = require('path');

var app = module.exports = express();

// Hook Socket.io into Express
var io = require('socket.io');

// Configuration
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

// production only
if (app.get('env') === 'production') {
  app.use(express.errorHandler());
};

// Socket.io Communication
http = http.createServer(app);
io = io.listen(http);
io.sockets.on('connection', socket);

// Start server

http.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});
