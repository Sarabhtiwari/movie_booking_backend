const MovieController = require('../controllers/movie.controller')

const routes = (app) => {
    //takes express app object as parameter
    app.post('/mba/api/v1/movies', MovieController.createMovie);

    app.delete('/mba/api/v1/movies/:id',MovieController.deleteMovie)
}

module.exports = routes;