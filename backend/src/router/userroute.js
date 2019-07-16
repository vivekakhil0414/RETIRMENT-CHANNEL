const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth')
const multer = require('multer');
const mailFun = require('../utilities/mail')
const encodeData = require('../utilities/utilityfunctions');
const photo = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload only image'))
        }
        cb(undefined, true)
    }
})

router.post('/register', async (req, res) => {

    const user = new User(req.body)
    console.log('users-=-=-=-=-=-=-=-=>', user)
    try {
        let hash = await encodeData.encryptPass(user._id.toString());
        user.mailHash = hash;
        let mailsent = await sendMailAfterRegistration(user, hash)
        await user.save();
        res.status(201).send({
            error: false,
            msg: 'User registered successfully'
        })
    } catch (error) {
        res.status(400).send(error)
    }
});

async function sendMailAfterRegistration(user, hash) {
    link = `http://localhost:3002/verify/${user.workemail}?code=${hash}`
    mailContent = `<h2>Good to see you ${user.firstName} ${user.SurName}</h2>
    <p>click on the link below to verify mail ${user.workemail}</p>
    <a href=${link}>VERIFY</a>`
    return mailFun(user.workemail, 'Verify mail', mailContent)
}

//--------LogIn--------------
router.post('/user/login', async (req, res) => {
    console.log('***********', req.body)
    try {
        var user = await User.findOne({
            workemail: req.body.workemail
        });

        if (!user) {
            res.json({
                error: true,
                msg: 'Invalid credentials'
            })
        }

        if (!user.mailVerified) {
            res.json({
                error: true,
                msg: 'Please verify your mail ' + user.workemail
            })
        }
        var ans = await bcrypt.compare(req.body.password, user.password);
        console.log('---------->', ans)
        const token = await user.generateAuthToken()
        console.log("xyz", user);
        let userData = {
            firstName: user.firstName,
            Nickname: user.Nickname,
            SurName: user.SurName,
            companyName: user.companyName,
            workemail: user.workemail,
            token: user.tokens[0].token
        }
        if (ans) {
            res.json({
                error: false,
                msg: 'login successfull',
                data: userData
            })
        } else {
            res.json({
                error: true,
                msg: 'invalid credentials',
            })
        }

    } catch (error) {

    }
})

router.get('/verify/:email', async (req, res) => {
    var user = await User.findOne({
        workemail: req.params.email
    })
    if (user.mailHash == req.query.code) {
        user.mailVerified = true;
        await User.findOneAndUpdate({workemail:user.workemail},{$set:{mailVerified:true}})
        res.json({
            error: false,
            msg: 'mail verified successfully'
        })
    } else {
        res.json({
            error: true,
            msg: 'mail not verified'
        })
    }
})
module.exports = router