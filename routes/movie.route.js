const MovieController = require('../controllers/movie.controller')
const movieMiddlewares = require('../middlewares/movie.middleware')

const routes = (app) => {
    //takes express app object as parameter
    app.post('/mba/api/v1/movies',movieMiddlewares.validateMovieCreateRequest, MovieController.createMovie);

    app.delete('/mba/api/v1/movies/:id',MovieController.deleteMovie)

    app.get('/mba/api/v1/movies/:id',MovieController.getMovie)

    app.put('/mba/api/v1/movies/:id',MovieController.updateMovie)

    app.patch('/mba/api/v1/movies/:id',MovieController.updateMovie) //can hit same controller but now with partial update   
}

module.exports = routes;