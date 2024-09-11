const users = require('../controllers/UserController.js');
const HealthStatus = require('../controllers/HealthStatus.js');
const { userAuthenticator } = require('../middleware/check-auth');


module.exports = (app) => {
    // register user
    app.post('/register', users.register);
    // login user
    app.post('/login', users.login);

    //post health status
    app.post('/postHealthStatus',  HealthStatus.postHealthStatus);
    // get health status
    app.get('/getHealthStatus',  [userAuthenticator], HealthStatus.getHealthStatus);

}
