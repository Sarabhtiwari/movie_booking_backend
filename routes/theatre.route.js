const theatreController = require('../controllers/theatre.controller')
const theatreMiddleware = require('../middlewares/theatre.middleware')

const routes = (app) => {

    app.post('/mba/api/v1/theatres',theatreMiddleware.validateTheatreCreateRequest,theatreController.create);

    app.get('/mba/api/v1/theatres/:id',theatreController.getTheatres);

    app.get('/mba/api/v1/theatres',theatreController.getAllTheatres);

    app.delete('/mba/api/v1/theatres/:id',theatreController.destroy)

    app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddleware.validateUpdateMovies,theatreController.updateMovies)
}
module.exports = routes;