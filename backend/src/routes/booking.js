const express = require('express');
const {addBooking, getAllBookings,deleteBooking} = require('../controller/booking');

const BookingRouter = express.Router();

BookingRouter.delete('/deleteBooking/:id',deleteBooking);
BookingRouter.post('/addBooking',addBooking);
BookingRouter.get('/getBookings/:clinicId',getAllBookings);

module.exports = BookingRouter;