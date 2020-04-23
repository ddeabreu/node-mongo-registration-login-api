#Creer une application dans Sendinblue

#Recuperer la cle API v3 

#renomer le fichier config_mail--sample.json en config_mail.json et renseigner SENDINBLUE_API_KEY

#instancier dans la page en question les require
```
//test mail
const mailService = require('mail/mail.service');
//test mail
```

#Lancer la fonction du service a l endroit desire
```
//test mail
mailService.sendMail('mail@mail.fr','register')
.then( res_mail => console.log('res_mail: ',res_mail) )
.catch(err => next(err));
//test mail
```
