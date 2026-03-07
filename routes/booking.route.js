const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const bookingMiddleware = require("../middlewares/booking.middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/bookings",
    authMiddleware.isAuthenticated,
    bookingMiddleware.validateBookingCreateRequest,
    bookingController.create,
  );

  app.patch(
    "/mba/api/v1/bookings/:id",
    authMiddleware.isAuthenticated,
    bookingMiddleware.canChangeStatus,
    bookingController.update,
  );
  //to get user's own bookings
  app.get(
    "/mba/api/v1/bookings",
    authMiddleware.isAuthenticated,
    bookingController.getBookings,
  );

  //to get all bookings ; for admin
  app.get(
    "/mba/api/v1/bookings/all",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    bookingController.getAllBookings,
  );

  //to get booking details by id using same getbookings fuck according to data pparameter we'll handle how it works whi jo login hai apni hi booking dekh skta particular
  app.get(
    "/mba/api/v1/bookings/:id",
    authMiddleware.isAuthenticated,
    bookingController.getBookingById,
  );
};

module.exports = routes;
