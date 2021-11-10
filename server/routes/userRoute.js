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
                    password: hash,
                    isAdmin: 'false'
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
                            email: user.email,
                            isAdmin: user.isAdmin
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

router.post('/update', async (req, res) => {
    const { userid, updateduser } = req.body;
    const userNewPassword = updateduser.password;

    try {
        bcrypt.hash(userNewPassword, 10).then((hash) => {
            users.update({
                password: hash
            }, { where: { userid: userid } })
            res.send("Success");
        })
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.get('/getallusers', async (req, res) => {
    const getAllUsers = await users.findAll();
    res.send(getAllUsers);
})

router.post("/deleteuser", async (req, res) => {

    const { userid } = req.body;

    const deleteUser = await users.destroy({
        where: { userid: userid }
    })
    res.json('Success');
});



module.exports = router;


