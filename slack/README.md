#renomer le fichier config_slack--sample.json en config_slack.json

#installer le webhook entrant sur slack ( https://ddaconseil.slack.com/apps/A0F7XDUAZ-webhooks-entrants?next_id=0 ) pour recuperer la bonne url 

#instancier dans la page en question les require
```
//test slack
const slackService = require('slack/slack.service');
//test slack
```

#Lancer la fonction du service a l endroit desire
```
//test slack
slackService.sendSlack('mon_message 2','register');
//fin test slack
```

