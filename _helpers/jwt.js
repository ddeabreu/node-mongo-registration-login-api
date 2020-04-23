const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/firebase-cloud-messaging-push-scope',
            '/firebase-messaging-sw.js', //si je veux activer les notifs firebase
            '/js/firebase-messaging-sw.js', //exemple de js lancer sur mon front
            '/js/test.js',//exemple de js lancer sur mon front
            '/favicon.ico',
            '/'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};