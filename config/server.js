/* importar o módulo do framework express */
var express = require('express'),
consign = require('consign'),
bodyParser = require('body-parser'),
multiparty = require('connect-multiparty'),
expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');
/* configurar o middleware express.static */
app.use(express.static('./app/public'));
/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());
/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/controllers')
	.then('app/validators')
	.into(app);

/*app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});*/
/* middleware que configura páginas de status */
app.use(function(req, res, next){
	res.status(404).render('errors/404');
	next();
});

/* middleware que configura msgs de erro internos */
app.use(function(err, req, res, next){
	res.status(500).render('errors/500');
	next();
});

/* exportar o objeto app */
module.exports = app;