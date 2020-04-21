const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

////lib notif
const config_notif = require('notification/config_notification.json');


module.exports = {
    sendNotification
};


async function sendNotification(notif_user_token,type_notif) {
	console.log('enclenchement de la fonction notification');
	
	var request = require("request");
	
	var options = { method: 'POST',
	  url: 'https://fcm.googleapis.com/fcm/send',
	  headers: 
	   { 'Postman-Token': 'cc27effd-c3d6-4e70-ba08-b110f8ff30d3',
	     'Cache-Control': 'no-cache',
	     'Content-Type': 'application/x-www-form-urlencoded',
	     Authorization: 'key=AAAAWMo6tqM:APA91bGU75m6TawTzBaUnO8jyCiWJ4V8gWTJXTjkDVA-Wbcho_EjJD1RkyN7Cmips2Vyp3sC7JkWns10Zbs82MejiypTXiDIryYJvuzd3D5Jvg7QITrWUP6a9UU-xxCv8LSPvDK4_mPx' },
	  form: 
	   { to: 'd6J3Z88Tyjo:APA91bH7TQsUZ1W1QfO3YAQ1S5CRc3s2NdSqk-eTyyefLy5ui5iWOXjwTbiDbCA_eHyOn-IYa69qP2e5ZdFAKk8QW6_Q-FJII8CalA3dTwXi04vZnSTmQqPXJHuDsQMJAHui4eP3dpvZ',
	     notification: '{\\"body\\":\\"ENTER YOUR MESSAGE HERE\\"}' } };
	
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	
	  console.log(body);
	});

	
	await 'notif sent ok';
}











async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}
async function getAll() {
    return await User.find().select('-hash');
}
async function getById(id) {
    return await User.findById(id).select('-hash');
}
async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    const user = new User(userParam);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    // save user
    await user.save();
}
async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
async function _delete(id) {
    await User.findByIdAndRemove(id);
}