/* importar as configurações do servidor */
var app = require('./config/server');
var models = require('./app/models');
var debug = require('debug')('express-sequelize');

/* parametrizar a porta de escuta */
models.sequelize.sync().then(function() {
	var server = app.listen(3000);
	app.on('error', onError);
	app.on('listening', onListening);
	var io = require('socket.io').listen(server);
	app.set('io', io);
	app.set('io', io);
});

function onError(error) {
	if (error.syscall !== 'listen') {
	  throw error;
	}
  
	var bind = typeof port === 'string'
	  ? 'Pipe ' + port
	  : 'Port ' + port;
  
	// handle specific listen errors with friendly messages
	switch (error.code) {
	  case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	  case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	  default:
		throw error;
	}
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
	debug('Listening on ' + bind);
  }