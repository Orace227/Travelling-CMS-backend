import Booking from "../schemas/Booking.js";

export const GetBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find({});
    // console.log(allBookings);
    if (allBookings.length > 0) {
      res.status(200).json({ allBookings });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
