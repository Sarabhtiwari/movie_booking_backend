const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');

//create movie pe validation error ya specific error show kar rhe 
const createMovie = async (data) => {
    try {
        const movie = await Movie.create(data)
        return movie;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            throw {err: err,code: 422};
        }else{
            throw error;
        }
    }
}

const getMovieById = async(id) => {
    const movie = await Movie.findById(id);

    if(!movie){
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        }
    }
    return movie;
}

const deleteMovie = async (id) => {
    try {
        const response = await Movie.findByIdAndDelete(id);
        if(!response){
            throw {
                err: "No movie found for the corresponding id provided to delete",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const updateMovie = async (id,data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id,data,{new: true, runValidators: true})
        return movie;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return {err: err,code: 422};
        }else{
            throw error;
        }
    }
    //this function updates but returns old record so to return new updated thing we use option -> {new: true} or returnOriginal = false

    //if want to use validators in update use
    //runValidators: true and handle it
    return movie;
} 
const fetchMovies = async (filter) => {
    let query = {};
    if(filter.name){
        query.name = filter.name;
    }
    let movies = await Movie.find(query)
    if(!movies){
        return {
            err: 'Not able to find the queried movies',
            code: 404
        }
    }
    return movies;
}

module.exports = {
    createMovie,
    getMovieById,
    deleteMovie,
    updateMovie,
    fetchMovies
}