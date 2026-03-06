const Movie = require('../models/movie.model')
const movieService = require('../services/movie.service')
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')
const { STATUS } = require('../utils/constants')

const createMovie = async (req,res) => {
    try {
        const response = await movieService.createMovie(req.body);
        if(response.err){
            errorResponseBody.err = response.err
            errorResponseBody.message = "Validation failed on few parameters of request body"
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the movie"
        //is line se resonse body me change ho rha tha to globally har succes me created movie ho dikha rha tha so commented ya to copy bana lo use bhejo
        return res.status(201).json(successResponseBody)
    } catch (error) {
        console.log(error)
        if(error.err){
            errorResponseBody.err = error.err
            return res.status(error.code).json(errorResponseBody)
        }
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const deleteMovie = async(req,res) => {
    try {
        const response = await movieService.deleteMovie(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getMovie = async (req,res) => {
    try {
        const response = await movieService.getMovieById(req.params.id);

        if(response.err){
            errorResponseBody.err = response.err
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const updateMovie = async (req,res) => {
    try {
        const response = await movieService.updateMovie(req.params.id,req.body)
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "the updates that we are trying to apply doesn't validate the schema";
            //beware ye global response bodies ko chaneg kar deta hai 
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getMovies = async (req,res) => {
    try {
        const response = await movieService.fetchMovies(req.query);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
};
module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
}
