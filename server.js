require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.get('/', (req, res) =>{
	console.log('/ demandee');	
	//res.send('<h1>Front de l API JWT</h1><form method="post" action="/users/register"><label for="name">Utilisateur</label><input type="text" name="username"><label for="name">Mot de Passe</label><input type="text" name="password"><input type="submit" value="Add"></form>');
	res.render("index"); 
	res.sendStatus(200);
	
})

// start server
const port = 80;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
