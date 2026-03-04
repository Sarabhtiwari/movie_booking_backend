const Theatre = require('../models/theatre.model')

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
            return {err: err, code: 422}
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

const fetchTheatres = async () => {
    try {
        const response = await Theatre.find({});;
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
    const theatre = await Theatre.findById(theatreid);
    if(!theatre){
        return {
            err: "No such theatre found for the id provided",
            code: 404
        }
    }
    if(insert){
        movieids.forEach(movieid => {
            theatre.movies.push(movieid);
        })
    }else{
        let savedMovieIds = theatre.movies;
        movieids.forEach(movieId => {
            savedMovieIds = savedMovieIds.filter(
                smi => smi != movieId
            )
        })
        theatre.movies = savedMovieIds;
    }
    await theatre.save(); //db call
    return theatre.populate('movies');
}
module.exports = {
    createTheatre,
    getTheatre,
    fetchTheatres,
    deleteTheatre,
    updateMoviesInTheatres
}