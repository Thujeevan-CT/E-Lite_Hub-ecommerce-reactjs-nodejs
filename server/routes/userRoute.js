const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");

router.post('/register', async (req, res) => {
    const { username, mobile, email, password } = req.body;

    const user = await users.findOne({ where: { email: email } });
    try {
        if (user === null) {
            bcrypt.hash(password, 10).then((hash) => {
                users.create({
                    username: username,
                    mobile: mobile,
                    email: email,
                    password: hash
                });
                res.send("Register Successfully");
            })
        } else {
            return res.status(400).json({ message: 'Register failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ where: { email: email } });

    try {
        if (user) {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    if (user.email && user.password) {
                        const currentUser = {
                            username: user.username,
                            userid: user.userid,
                            email: user.email
                        }
                        res.send(currentUser)
                    }
                } else {
                    return res.status(400).json({ message: 'Password Not Match' });
                }
            });
        } else {
            return res.status(400).json({ message: 'Email Not Match' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }

});


module.exports = router;


// if (user.email !== email) {

//     users.create({
//         username: username,
//         mobile: mobile,
//         email: email,
//         password: password
//     });
//     res.json("SUCCESS");

// } else {
//     res.json('Email Already registered')
// }








// res.send(user.email && (user.password === password))
    // const check = bcrypt.compare(password, user.password);
    // res.send(check)

    // bcrypt.compare(password, user.password).then(function (result) {
    //     res.send(result)
    // });

// if (!user) res.json({ error: "User Doesn't Exist" });
//     bcrypt.compare(password, user.password).then(async (match) => {
//         if (!match) res.json({ error: "Wrong Username And Password Credentials" });

//         const currentUser = {
//             username: user.username,
//             userid: user.userid,
//             email: user.email
//         }

//         console.log(currentUser)
//     })