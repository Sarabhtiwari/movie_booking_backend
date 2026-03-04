const { errorResponseBody } = require("../utils/responsebody")

const validateTheatreCreateRequest = async(req,res,next) => {
    if(!req.body.name){
        errorResponseBody.message = "The name of the theatre is not present in the request"
        return res.status(400).json(errorResponseBody)
    }
    if(!req.body.pincode){
        errorResponseBody.message = "The pincode of the theatre is not present in the request"
        return res.status(400).json(errorResponseBody)
    }
    if(!req.body.city){
        errorResponseBody.message = "The city of the theatre is not present in the request"
        return res.status(400).json(errorResponseBody)
    }
    next();
}

const validateUpdateMovies = async(req,res,next) => {
    //using undefined since if we pass insert as false it sees it as not present if wrote !req.body.insert
    if(req.body.insert == undefined){
        errorResponseBody.message = "The insert parameter is not present in the request"
        return res.status(400).json(errorResponseBody)
    }
    if(!req.body.movieids){
        errorResponseBody.message = "No movies in the request to be updated"
        return res.status(400).json(errorResponseBody)
    }
    if(!(req.body.movieids instanceof Array)){
        errorResponseBody.message = "Expected array of movie ids but got something else"
        return res.status(400).json(errorResponseBody)
    }
    if(req.body.movieids == 0){
        errorResponseBody.message = "No movies present in the array provided to be updated"
        return res.status(400).json(errorResponseBody)
    }
    //else everything fine
    next();
}
module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMovies
}