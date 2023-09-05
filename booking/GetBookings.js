import Booking from "../schemas/Booking.js";

export const GetBookings = async (req, res) => {
  try {
    const { clientId } = req.query;
    const existedBookings = await Booking.findOne({ clientId });
    // console.log(allBookings);

    if (existedBookings) {
      const allBookings = await Booking.find({ clientId });
      if (allBookings.length > 0) {
        res.status(200).json({ allBookings });
      }
    } else {
      res.status(404).json({
        error: `Any bookings are Not Found for client id ${clientId}`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
