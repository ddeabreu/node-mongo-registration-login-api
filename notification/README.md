#Creer une application dans Firebase

#Mettre en place les versions qui m'interesse, par exemple web - ios - android

#je vais ensuite dans les params de l'app et je recupère la "clé du serveur"

#renomer le fichier config_notfication--sample.json en config_notification.json

#instancier dans la page en question les require
```
//test notification
const notificationService = require('notification/notification.service');
//test notification
```

#Lancer la fonction du service a l endroit desire
```
//test notif
notificationService.sendNotification('token_user','register')
.then( res_notif => console.log('res_notif: ',res_notif));
//fin test notif
```
