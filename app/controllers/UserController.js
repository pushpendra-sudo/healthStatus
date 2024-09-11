const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


// register user
exports.register = (req, res) => {
    User.findOne({
        email: req.body.email, deletedAt: "0"
    }).then(result => {
        if (result) {
            return res.status(409).json({
                "status_code": 409,
                "data": {},
                "message": "Email already exists",
            });
        } else {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                phone: req.body.phone,
                gender: req.body.gender
            });
            user.save().then(result => {
                res.status(200).json({
                    "status_code": 200,
                    'data': result,
                    'message': "User created successfully",
                });
            })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

// login user
exports.login = (req, res) => {
    User.findOne({
        email: req.body.email, deletedAt: "0"
    }).then(result => {
        if (!result) {
            return res.status(400).json({
                "status_code": 400,
                "data": {},
                "token": "",
                "message": "you are not a valid user !!"
            });
        } else {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const token = jwt.sign({
                    _id: result._id,
                    name: result.name,
                    email: result.email
                },
                    'secret', {
                    expiresIn: "24h"
                });
                return res.status(200).json({
                    "status_code": 200,
                    "data": result,
                    "token": token,
                    "message": "login successfully"
                });
            } else {
                return res.status(401).json({
                    "status_code": 401,
                    "data": {},
                    "token": "",
                    "message": "invalid password"
                });

            }

        }

    });
}


