const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
//app.use(cors());

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// Configuring the database
const dbConfig = require('./config/database.config.js');
//console.log("dbConfig--------->", dbConfig.url)
mongoose.Promise = global.Promise;

// TODO: Validate the JWT token
app.use((req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            return jwt.verify(token, 'secret', (err, userData) => {
            	// console.log("err---->",err);
            	// console.log("userData---->",userData)
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "User is not authenticated",
                    });
                }
                req.user = {
                    id: userData._id,
                    username: userData.username,
                    email: userData.email,
                    token: token,
                    exp: userData.exp
                }
                return next();
            });
        }
        return res.unauthorized();
    }
    next();
});


// Connecting to the database
mongoose.connect(dbConfig.url, {
     useNewUrlParser: true ,
     useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Health application."});
});

// Require Notes routes
require('./app/routes/routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

mongoose.Promise = global.Promise;

module.exports = app;

// https://cloud.mongodb.com/v2/66e01e2015ea7c4bc363bcde#/metrics/replicaSet/66e01f2502e1407cc4f56155/explorer/test/users/find