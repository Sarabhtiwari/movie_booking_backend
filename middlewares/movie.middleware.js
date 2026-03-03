const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Bad Request"
}

const validateMovieCreateRequest = (req,res,next) => {
    // suppose someone creates movie not passing some required details then how frontend knows what happend so to validate using middleware

    if(!req.body.name){
        badRequestResponse.err ="the name of the movie is not present in the request sent"
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.description){
        badRequestResponse.err ="the description of the movie is not present in the request sent"
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
        badRequestResponse.err ="the casts of the movie is not present in the request sent"
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.trailerUrl){
        badRequestResponse.err ="the trailerUrl of the movie is not present in the request sent"
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.releaseDate){
        badRequestResponse.err ="the releaseDate of the movie is not present in the request sent"
        return res.status(400).json(badRequestResponse);
    }
    
    if(!req.body.director){
        badRequestResponse.err ="the director of the movie is not present in the request sent"
        return res.status(400).json(badRequestResponse);
    }
    next();
}

module.exports = {
   validateMovieCreateRequest
}