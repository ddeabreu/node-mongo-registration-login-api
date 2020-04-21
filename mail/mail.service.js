const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

////lib mail
const config_mail = require('mail/config_mail.json');
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config_mail.SENDINBLUE_API_KEY;
////fin lib mail


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    sendMail
};

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

async function sendMail(mail_user,type_mail) {
	console.log('enclenchement de la fonction mail');
	
	////TEST SIMPLE DE GET ACCOUNT
/*
	var api = new SibApiV3Sdk.AccountApi()
	api.getAccount().then(function(data) {
		console.log('API called successfully. Returned data: ' + JSON.stringify(data));
	}, function(error) {
		console.error(error);
	});
*/
	////FIN TEST SIMPLE DE GET ACCOUNT
	
	////TEST ENVOI DE TEMPLATE
	var apiInstance = new SibApiV3Sdk.SMTPApi();
	var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
	sendSmtpEmail = {
		to: [{
			email: mail_user,
			name: 'John Doe'
		}],
		templateId: 1, //id du token dans sendinblue
		params: {
			name: 'John',
			surname: 'Doe'
		},
		headers: {
			'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
		}
	};
	console.log('sendSmtpEmail vaut: ',sendSmtpEmail);
	
	apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
	  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
	}, function(error) {
	  console.error(error);
	});
	////FIN TEST SIMPLE DE TEMPLATE
	
	await 'mail sent ok';
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