const theatreController = require('../controllers/theatre.controller')
const theatreMiddleware = require('../middlewares/theatre.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

const routes = (app) => {

    app.post('/mba/api/v1/theatres',theatreMiddleware.validateTheatreCreateRequest,theatreController.create);

    app.get('/mba/api/v1/theatres/:id',theatreController.getTheatres);

    app.get('/mba/api/v1/theatres',theatreController.getAllTheatres);

    app.delete('/mba/api/v1/theatres/:id',authMiddleware.isAuthenticated,theatreController.destroy)

    app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddleware.validateUpdateMovies,theatreController.updateMovies)

    app.patch('/mba/api/v1/theatres/:id',theatreController.update)

    app.put('/mba/api/v1/theatres/:id',theatreController.update)

    app.get('/mba/api/v1/theatres/:id/movies',theatreController.getMovies)

    app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId',theatreController.checkMovie)
}
module.exports = routes;