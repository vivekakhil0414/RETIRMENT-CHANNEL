const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    Nickname: {
        type: String,
        trim: true
    },
    SurName: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    office: {
        type: String,
        required: true,
        trim: true
    },
    workemail: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        tolowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    workephone: {
        type: Number,
        required: true,
        minlength: 10
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    repassword: {
        type: String,
        required: true,
        trim: true
    },
    mailHash:{
        type:String
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})
// hide password and token

// userSchema.methods.toJSON = function () {
//     const user = this
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens
//     return userObject
// }

// create jwt
userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'somesecretkey')
    user.tokens = user.tokens.concat({token})
    return token
}


// login user by email and password
// userSchema.statics.findByCredential = async (workemail,password)=> {
//     const user = await User.findOne({workemail:workemail})
//     if(!user){
//         return false
//     }else{
//         console.log(password,user.password)
//         var ans = await bcrypt.compare(password, user.password)
//         console.log(ans,user)
//         if(ans){
//             return user
//         }else{
//             return false
//         }
//     }
// }



// to hash the plain text password
userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(user.password,8)
    //console.log(user.password)
    next();
})

const User = mongoose.model('User',userSchema)
module.exports = User;
