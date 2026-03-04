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
            return {err: err, code: 422}
        }
        throw error;
    }
}
module.exports = {
    createTheatre,
    getTheatre,
    fetchTheatres,
    deleteTheatre,
    updateMoviesInTheatres,
    updateTheatre
}