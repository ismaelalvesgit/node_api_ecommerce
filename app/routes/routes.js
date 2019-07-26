var models  = require('../models');
module.exports = function(app, db){
	app.get('/', (req, res) => {
        models.User.findAll().then(customers => {
            // Send all customers to Client
            res.send(customers);
          });
    });

}