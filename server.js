require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

//test mail
const mailService = require('mail/mail.service');
//test mail

//test notification
const notificationService = require('notification/notification.service');
//test notification

//test slack
const slackService = require('slack/slack.service');
//test slack



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

////si je veux lancer des js sur mon front 
app.use('/js', express.static(__dirname + '/js') );
//// si besoin d image
//app.use('/img', express.static(__dirname + '/img') );

////si je veux faire une redir pour avoir NDD.com/file en le prennant dans /js/file 
app.use('/firebase-messaging-sw.js', express.static(__dirname + '/js/firebase-messaging-sw.js') );
app.use('/favicon.ico', express.static(__dirname + '/img/favicon.ico') );


// global error handler
app.use(errorHandler);

app.get('/', (req, res) =>{
	console.log('/ demandee');	
/*
	//test mail
	mailService.sendMail('mail@mail.fr','register')
	.then( res_mail => console.log('res_mail: ',res_mail) )
	.catch(err => next(err));
	//test mail
*/
	
/*
	//test notif
	notificationService.sendNotification('token_user','register')
	.then( res_notif => console.log('res_notif: ',res_notif));
	//fin test notif	
*/

/*
	//test slack
	slackService.sendSlack('mon_message 2','register');
	//fin test slack
*/
	
	
	////je renvoi une reponse a mon client, soit du html brut soit du template html si j ai un view engine d actif
	//res.send('<h1>Front de l API JWT</h1><form method="post" action="/users/register"><label for="name">Utilisateur</label><input type="text" name="username"><label for="name">Mot de Passe</label><input type="text" name="password"><input type="submit" value="Add"></form>');
	res.render("index"); 
	
})

// start server
const port = 80;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
