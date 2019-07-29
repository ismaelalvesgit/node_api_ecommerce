module.exports.validarUsuario  = function(app, req, res){
    req.assert('email', 'Email e obrigatório').notEmpty();
}