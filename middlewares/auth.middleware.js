const jwt = require('jsonwebtoken')

const { errorResponseBody } = require("../utils/responsebody")
const userService = require('../services/user.service')
const { USER_ROLE, STATUS } = require('../utils/constants')

//for signup 
const validateAuthRequest = async (req,res,next) => {
    if(!req.body.name){
        errorResponseBody.err = "Name of the user not present in the request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.email){
        errorResponseBody.err = "Email of the user not present in the request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.err = "password of the user not present in the request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

//for signin
const validateSignInRequest = async (req,res,next) => {
    if(!req.body.email){
        errorResponseBody.err = "Email of the user not present in the signn in request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.err = "password of the user not present in the sign in request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

const isAuthenticated = async(req,res,next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token) {
            errorResponseBody.err = "No token provided"
            return res.status(STATUS.FORBIDDEN).json(errorResponseBody)
        }
    
        const response = jwt.verify(token,process.env.AUTH_KEY);
        //repsonse will have id of user
        if(!response){
            errorResponseBody.err = "Token not verified"
            return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody)
        }
        const user = await userService.getUserById(response.id);

        req.user = user.id;
        next();
    } catch (error) {
        if(error.name == "JsonWebTokenError"){
            errorResponseBody.err = error.message;
            return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody)
        }
        if(error.code == STATUS.NOT_FOUND){
            errorResponseBody.err = "No user found for the given id"
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

//for resetpassword
const validateResetPasswordRequest = async (req,res,next) => {
    if(!req.body.oldPassword){
        errorResponseBody.err = "old password of the user not present in the request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.newPassword){
        errorResponseBody.err = "new password of the user not present in the request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

const isAdmin = async(req,res,next) => {
    const user = await userService.getUserById(req.user); //middleware se hai hamare pass user ki info ab tum authorise kar rhe usme har baar user thodi apni id bhejega use kya mtlab so isliye req.user me store karte
    if(user.userRole != USER_ROLE.admin){
        errorResponseBody.err = "User is not admin,cannot proceed with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody)
    }
    next();
}


const isClient = async(req,res,next) => {
    const user = await userService.getUserById(req.user); //middleware se hai hamare pass user ki info ab tum authorise kar rhe usme har baar user thodi apni id bhejega use kya mtlab so isliye req.user me store karte
    if(user.userRole != USER_ROLE.client){
        errorResponseBody.err = "User is not client,cannot proceed with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody)
    }
    next();
}

const isAdminOrClient = async(req,res,next) => {
    const user = await userService.getUserById(req.user); //middleware se hai hamare pass user ki info ab tum authorise kar rhe usme har baar user thodi apni id bhejega use kya mtlab so isliye req.user me store karte
    if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client){
        errorResponseBody.err = "User is neither admin nor client ,cannot proceed with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody)
    }
    next();
}
//ye teeno se ye kar skte ki jaise tumhe kisi aur user ka role change karna hai to wo koi admin kar skta aur admin kisi bhi user ka change kar skta 
//so try logging in with any admin and token take and params.id me userid uski daalo jiski update karni ho dekhna



module.exports = {
    validateAuthRequest,
    validateSignInRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
}