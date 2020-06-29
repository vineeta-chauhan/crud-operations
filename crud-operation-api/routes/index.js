const express = require('express');
const { User } = require('../models');



const router = express.Router();

/**
 * Controllers (route handlers).
 */

router.post('/v1/setUserData', (req, res) => {
    let data = req.body;

    let user = new User(data);``
    user.save()
        .then((result) => {
            console.log("=======inside then");
            res.status(201).send(result);
        })
        .catch((err) => {
            console.log("=======inside catch");
            if (err.errors) {
                res.status(400).send(err);
                return;
            }
            res.status(500).send(err);
        })
});

router.get('/v1/getAllUsersData', (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.delete('/v1/deleteUserData/:mobileNo', (req, res) => {
    let userMobileNo;
    try {
        userMobileNo = req.params.mobileNo;
    } catch (err) {
        res.status(500).send("Server error ");
        console.log(err);
    }

    User.findOneAndRemove({ Phone_Number: userMobileNo })
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.put('/v1/updateUserData/:mobileNo', (req, res) => {
    let userMobileNo;
    let updateData = req.body;
    try {
        userMobileNo = req.params.mobileNo;
    } catch (err) {
        res.status(500).send("Server error");
    }

    User.findOneAndUpdate({ Phone_Number: userMobileNo }, updateData, {
        new: true
    })
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(500).send(err);
        })

})



module.exports = router;