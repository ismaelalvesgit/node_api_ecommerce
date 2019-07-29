/* importar o módulo do framework express */
var express = require('express'),
consign = require('consign'),
bodyParser = require('body-parser'),
multiparty = require('connect-multiparty'),
cors = require('cors'),
admin  = require('firebase-admin'),
firebase = require('firebase'),
expressValidator = require('express-validator');

//firebase admin
var serviceAccount = require('./firebase-adminsdk.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://lojavirtual-aa1c6.firebaseio.com"
});

//firebase
var firebaseConfig = {
    apiKey: "AIzaSyBWVvabc4D_XVhXbk58QO1U1BWe9uhkXnc",
    authDomain: "lojavirtual-aa1c6.firebaseapp.com",
    databaseURL: "https://lojavirtual-aa1c6.firebaseio.com",
    projectId: "lojavirtual-aa1c6",
    storageBucket: "lojavirtual-aa1c6.appspot.com",
    messagingSenderId: "887568812524",
    appId: "1:887568812524:web:5306807591085f3c"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//iniciar o objeto do express 
var app = express();

app.set('view engine', 'hbs');
app.set('views', './app/views');

//configurar o middleware 
app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());
app.use(cors());
app.use(expressValidator());

// efetua o autoload das rotas, dos models e dos controllers para o objeto app 
consign()
	.include('app/routes')
	.then('app/controllers')
	.then('app/validators')
	.then('app/utils')
	.into(app);

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.end()
	next();
});

/* exportar o objeto app */
module.exports = app;