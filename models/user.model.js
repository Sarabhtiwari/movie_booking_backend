const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter valid Email"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5 
    },
    userRole:{
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    }
},{timestamps: true})

userSchema.pre('save', async function(){
    //trigger to encrypt plain password to encrypted one
    //console.log(this);
    if (!this.isModified("password")) return;
    //so that every time save is done it not rehashes
    const user = this; //this is pointing to calling user
    const hash = await bcrypt.hash(this.password,10);
    // console.log(hash);
    this.password = hash;
    // console.log(this);
    // next();
})

/**
 * to compare password
 * @param plainPassword 
 * @returns boolean -> passwords same or not
 */

//arrow function doesn't have this
userSchema.methods.isValidPassword = async function (plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
}

const User = mongoose.model('User',userSchema);
module.exports = User