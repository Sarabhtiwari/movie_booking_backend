const theatreService = require('../services/theatre.service');
const { STATUS } = require('../utils/constants');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')

const create = async (req,res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        successResponseBody.data = response
        // console.log(response)
        successResponseBody.message = "Successfully created the theatre"

        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatres = async(req,res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message = "Successfully fetched the theatres"
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {

        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
} 

const getAllTheatres = async(req,res) => {
    try {
        const response = await theatreService.fetchTheatres(req.query);

        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all theatres";
        
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const destroy = async(req,res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "successfully deleted theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        console.log(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMovies = async(req,res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(req.params.id,req.body.movieids,req.body.insert);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated movies in theatre"
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const update = async(req,res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id,req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the theatre"
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const getMovies = async (req,res) => {
    try {
        const response = await theatreService.getMoviesInATheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all movies in a theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const checkMovie = async(req,res) => {
    try {
        const response = await theatreService.checkMovieInATheatre(req.params.theatreId,req.params.movieId);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully checked if movie is  present in the theatre"
        return res.status(STATUS.OK).json(successResponseBody)
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
module.exports = {
    create,
    getTheatres,
    getAllTheatres,
    destroy,
    updateMovies,
    update,
    getMovies,
    checkMovie
}