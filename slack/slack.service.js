const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

////lib notif
const config_slack = require('slack/config_slack.json');
var axios = require('axios');

module.exports = {
    sendSlack
};


async function sendSlack(message_slack,type_notif) {
	console.log('enclenchement de la fonction slack');

    // Build request data
    const payload = "{\"channel\": \"#"+config_slack.slack_chan+"\", \"username\": \""+config_slack.slack_name+"\", \"text\": \""+message_slack+"\", \"icon_emoji\": \":ghost:\"}" ;

    //// Envoi req au server slack
    await axios.post(config_slack.slack_url, payload)
    .then((res) => {
	    //console.log('res de axios.post -> ', res);
        if (res.data == 'ok') {
             console.log("Slack has been sent");
        } else {
            console.error(`Slack sent error : ${res.data.error}`);
        }
    })
    .catch((err) => {
        console.log(`Slack sent error : ${err}`);
    });
    
}




