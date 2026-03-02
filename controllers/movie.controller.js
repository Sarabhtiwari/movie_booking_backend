const Movie = require('../models/movie.model')

const createMovie = async (req,res) => {
    try {
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: 'Successfully created a new movie'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error,
            data: {},
            message: 'Something went wrong'
        });
    }
};

const deleteMovie = async(req,res) => {
    try {
        const response = await Movie.deleteOne({_id: req.params.id});
        return res.status(200).json({
            success: true,
            error: {},
            message: 'Successfully deleted the movie',
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error,
            message: 'Something went wrong',
            data: {}
        });
    }
};
module.exports = {
    createMovie,
    deleteMovie
}