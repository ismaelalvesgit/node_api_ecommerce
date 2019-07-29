
module.exports = function(app){

	app.get('/', (req, res) => {
    app.app.controllers.usuarioController.listarTodos(app, req, res);
  });

  app.post('/cadastrar-usuario', (req, res) => {
    app.app.controllers.usuarioController.criar(app, req, res);
  });

  app.post('/login', (req, res) => {
    app.app.controllers.usuarioController.login(app, req, res);
  });

  app.post('/reset-senha', (req, res) => {
    app.app.controllers.usuarioController.resetSenha(app, req, res);
  });

  app.put('/atualizar-usuario', (req, res) => {
    app.app.controllers.usuarioController.atualizar(app, req, res);
  });

  app.post('/email', (req, res) => {
    app.app.controllers.emailController.sendEmail(app, req, res);
  });
}