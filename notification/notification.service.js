const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

////lib notif
const config_notif = require('notification/config_notification.json');
var axios = require('axios');

module.exports = {
    sendNotification
};



async function sendNotification(notif_user_token,type_notif) {
	console.log('enclenchement de la fonction notification');

	const phoneToken = 'dOBWadPgU5vXe8V7B7IjCB:APA91bEHp4GndK_bBojc8koYx509lz6J6xaGroBIC_ijS6XIQi97TSxx_nG0WUDZ8sMdgfEHjgvayexvv8O2eBffJByn90o8Qy2vuBsQgQCY0CByj5QHLnCKWPuwJtLypy6JUiL5mLlt';//cherie token 
	
	const notification = buildNotification(notif_user_token);
	sendNotification(notification);
	

	function buildNotification (data) {
	  const { name } = data;
	  const message = "hello ca va ?";
	  const title = "Notif Title 2 ";
	  
	  return {
	    "notification": {
	      "title":`${title}`,
	      "text":`${message}`,
	      "sound":"default"
	    },
	    "to":phoneToken,
	    "priority":"high"
	  }
	}
	
	function buildRequest (notification) {
		

	  return {
	    url: 'https://fcm.googleapis.com/fcm/send',
	    method: 'post',
	    headers: {
	      "Content-Type":"application/json",
	      "Authorization":`key=${config_notif.fcmKey}`
	    },
	    data: notification
	  }
	}
	
	function sendNotification(notification) {
	  const request = buildRequest(notification)
	  axios(request).then((r) => {
	    //console.log('reponse de FCM -> ',r);
	    if(r.data.success == 0){
		    console.log('reponse ko du serveur FCM',r.data);
	    }else{
		    console.log('Envoi de notif ok');
		    console.log('reponse ok du serveur FCM',r.data);
	    
	    }
	  }).catch((error) => {
	    console.log(error)
	  })
	}
	
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