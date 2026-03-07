const showController = require('../controllers/show.controller');
const authMiddlewares = require('../middlewares/auth.middleware');
const showMiddlewares = require('../middlewares/show.middleware');

const routes = (app) => {
    app.post(
        '/mba/api/v1/shows',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateCreateShowRequest,
        showController.create
    );

    app.get(
        '/mba/api/v1/shows',
        showController.getShows
    );

    app.delete(
        '/mba/api/v1/shows/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showController.destroy
    );

    app.patch(
        '/mba/api/v1/shows/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateShowUpdateRequest,
        showController.update
    );
}

module.exports = routes;