const { STATUS, BOOKING_STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const theatreService = require('../services/theatre.service')
const userService = require('../services/user.service')

const validateBookingCreateRequest = async(req,res,next) => {
    if(!req.body.theatreId){
        errorResponseBody.err = "NO theatre id provided"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    //valid theatre id hai ya nhi
    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.err = "Invalid theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    //theatre hai ya nhi
    const theatre = await theatreService.getTheatre(req.body.theatreId);

    if(!theatre){
        errorResponseBody.err = "NO theatre found for the given id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody)
    }

    //vlaidate movie presence
    if(!req.body.movieId){
        errorResponseBody.err = "No movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    //valid movie id hai ya nhi
    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.err = "Invalid movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    
    if(!theatre.movies.includes(req.body.movieId)){
        errorResponseBody.err = "Given movie not present in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    if(!req.body.timings){
        errorResponseBody.err = "No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.noOfSeats){
        errorResponseBody.err = "No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

const canChangeStatus = async(req,res,next) => {

    const user = await userService.getUserById(req.user);

    if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.processing){
        errorResponseBody.err = "You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);
    }
    next();
}


module.exports = {
    validateBookingCreateRequest,
    canChangeStatus
}