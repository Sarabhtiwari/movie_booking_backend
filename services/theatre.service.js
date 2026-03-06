const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');

const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err: err, code: STATUS.UNPROCESSABLE_ENTITY}
        }
        console.log(error);
        throw error;
    }
}

const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if(!response){
            return {
                err: "No theatre found for the given id",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const fetchTheatres = async (data) => {
    try {
        let query = {};
        let pagination = {};
        if(data && data.city){
            query.city = data.city;
        }
        //not else if so that we can search for both asked things
        if(data && data.pincode){
            query.pincode = data.pincode;
        }
        if(data && data.name){
            query.name = data.name
        }

        if(data && data.limit){
            pagination.limit = data.limit;
        }
        if(data && data.skip){
            //we say frontend tells us on which page we are
            //then how to ; skip skip is page no. ->0 indexed
            let perPage = (data.limit) ? data.limit : 3;//if frontend tells us how many recods per page it shows otherwise we set 
            pagination.skip = data.skip*perPage;
        }
        //we want all theatres having a movie
        if(data && data.movieId){
            query.movies = {$all: data.movieId};
        }
        const response = await Theatre.find(query,{},pagination);

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteTheatre = async(id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if(!response){
            return {
                err: "No record(theatre) found for the given id",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * req.body -> we have the movie id and insert boolean  if insert is true we insert the movies to that theatre otherwise we remove that movies from that theatre we can make two endpoints also for this but for the time being this is it
 */

const updateMoviesInTheatres = async (theatreid,movieids,insert) => {
    try {

        if(insert){
            await Theatre.updateOne(
                {_id: theatreid},
                {$addToSet: {movies : {$each: movieids}}}
            )
        }else{
            await Theatre.updateOne(
                {_id: theatreid},
                {$pull: {movies: {$in: movieids}}}
            );
        }

        const theatre = await Theatre.findById(theatreid);

        if(!theatre){
            return {
                code: 404,
                err: "No theatre found to update movies"
            }
        }

        return theatre.populate('movies');

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTheatre = async (id,data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, { new: true ,runValidators: true})
        // console.log({data,id})
        if(!response){
            return {
                err: "No theatre found to update",
                code: 404
            }
        }
        return response;
    } catch (error) {
        if(error.name == "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            })
            return {err: err, code: STATUS.UNPROCESSABLE_ENTITY}
        }
        throw error;
    }
}

const getMoviesInATheatre = async(id) => {
    try {
        const response = await Theatre.findById(id,{name: 1,movies: 1}).populate('movies');
        //means name of theatre and movies not full theatre data
        if(!response){
            return {
                code: 404,
                err: "No theatre found for the given id"
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const checkMovieInATheatre = async(theatreId,movieId) => {
    try {
        const response = await Theatre.findById(theatreId);
        if(!response){
            return {
                code: 404,
                err: "No such theatre found"
            }
        }
        return response.movies.indexOf(movieId) != -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    createTheatre,
    getTheatre,
    fetchTheatres,
    deleteTheatre,
    updateMoviesInTheatres,
    updateTheatre,
    getMoviesInATheatre,
    checkMovieInATheatre
}