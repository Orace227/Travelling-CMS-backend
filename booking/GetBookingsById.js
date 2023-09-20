import Booking from "../schemas/Booking.js";

export const GetBookingsById = async (req, res) => {
  try {
    const { bookingId } = req.query;
    const existedBookings = await Booking.findOne({ bookingId });
    // console.log(allBookings);

    if (existedBookings) {
      const allBookings = await Booking.find({ bookingId });
      if (allBookings.length > 0) {
        res.status(200).json({ allBookings });
      }
    } else {
      res.status(404).json({
        error: `Any bookings are Not Found for client id ${bookingId}`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
