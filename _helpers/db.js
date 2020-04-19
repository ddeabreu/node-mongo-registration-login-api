const config = require('config.json');
const mongoose = require('mongoose');

var options = {
	useNewUrlParser: true,
	user: config.user_bdd,
	pass: config.pass_bdd,
	useCreateIndex: true
};

mongoose.connect(config.connectionString, options)
		.then(() => console.log('MongoDB Connected'))
		.catch(err => console.log(err));	;
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};