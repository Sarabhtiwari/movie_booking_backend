const Movie = require('../models/movie.model')
const movieService = require('../services/movie.service')
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')
const { STATUS } = require('../utils/constants')

const createMovie = async (req,res) => {
    try {
        const response = await movieService.createMovie(req.body);
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
        successResponseBody.data = response
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getMovie = async (req,res) => {
    try {
        const response = await movieService.getMovieById(req.params.id);
        successResponseBody.data = response
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const updateMovie = async (req,res) => {
    try {
        const response = await movieService.updateMovie(req.params.id,req.body)
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);

    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getMovies = async (req,res) => {
    try {
        const response = await movieService.fetchMovies(req.query);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
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
