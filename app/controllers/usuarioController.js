var models  = require('../models');
var admin = require('firebase-admin');
var firebase = require('firebase');

module.exports.criar = function(app, req, res){
	app.app.validators.usuarioValidator.validarUsuario(app, req, res);
	var erros =  req.validationErrors();
    if(erros){
        return res.json({validacao:erros});
    }else{
		admin.auth().createUser({
			email: req.body.email,
			emailVerified: false,
			phoneNumber: req.body.telefone,
			password: req.body.senha,
			displayName: req.body.nome,
			photoURL: req.body.foto,
			disabled: false
		})
		.then(function(userRecord) {
			res.send('usuario criado com sucesso uid:'+userRecord.uid);
		})
		.catch(function(error) {
			res.status(401).send(app.app.utils.errorTratamentAuthentication.auth(error))
		});
	}
}

module.exports.atualizar = function(app, req, res){
	admin.auth().updateUser(req.body.uid, {
		email: req.body.email,
		emailVerified: false,
		phoneNumber: req.body.telefone,
		password: req.body.senha,
		displayName: req.body.nome,
		photoURL: req.body.foto,
		disabled: false
	})
	.then(function(userRecord) {
			res.send("usuario atualizado com sucesso!!!");;
	})
	.catch(function(error) {
		res.status(401).send(app.app.utils.errorTratamentAuthentication.auth(error));
	});
}

module.exports.desativar = function(app, req, res){
	admin.auth().updateUser(req.body.uid, {
		disabled: true
	})
	.then(function(userRecord) {
			res.send("usuario desativado com sucesso!!!");;
	})
	.catch(function(error) {
		res.status(401).send(app.app.utils.errorTratamentAuthentication.auth(error));
	});
}

module.exports.listarTodos = function(app, req, res){
	admin.auth().listUsers()
    .then(function(listUsersResult) {
	  var data = [];
      listUsersResult.users.forEach(function(userRecord) {
		data.push(userRecord.toJSON())
	  });
	  res.send(data);
    })
    .catch(function(error) {
		res.status(401).send(app.app.utils.errorTratamentAuthentication.auth(error));
    });
}

module.exports.login = function(app, req, res){
	firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.senha)
	.then((data)=>{
		res.send(data)
	})
	.catch((error)=>{
		res.status(401).send(app.app.utils.errorTratamentAuthentication.auth(error))
	});
}

module.exports.resetSenha = function(app, req, res){
	firebase.auth().sendPasswordResetEmail(req.body.email)
	.then((send)=>{
		res.send('enviamos um email para '+req.body.email)
	})
	.catch((error)=>{
		res.status(401).send(app.app.utils.errorTratamentAuthentication.auth(error))
	});
}