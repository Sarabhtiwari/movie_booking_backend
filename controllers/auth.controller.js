const jwt = require('jsonwebtoken')


const userService = require('../services/user.service');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');

const signup = async (req,res) => {
    try {
        const response = await userService.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully registered user"
        return res.status(201).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        } 
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody)
    }
}


const signin = async(req,res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);

        const isValidPassword = await user.isValidPassword(req.body.password);

        if(!isValidPassword){
            throw {err: "Invalid  password for the given email", code: 401} 
        }

        const token = jwt.sign({id: user.id,email: user.email} , process.env.AUTH_KEY, {expiresIn: '1h'})

        // console.log(jwt.verify(token,process.env.AUTH_KEY)) must see this //iat and eat
        successResponseBody.message = "Successfuully logged in";
        successResponseBody.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token
        }
        return res.status(200).json(successResponseBody)

    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        console.log(error)
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody)
    }
}
//to logout we have two ways in jwt 
//1. either the token expires
//2. delete stored token in frontend since server is stateless no mtlab
// Reset password and forget password are different things so here only implementing reset password 

const resetPassword = async (req,res) => {
    try {
        const user = await userService.getUserById(req.user);

        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);

        if(!isOldPasswordCorrect){
            throw {err: "Invalid old password,please write correct old password",cose: 403}
        }
        user.password = req.body.newPassword
        await user.save();

        successResponseBody.data = user;
        successResponseBody.message = "Successfully updated the password for the given user"

        return res.status(200).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}
module.exports = {
    signup,
    signin,
    resetPassword
}