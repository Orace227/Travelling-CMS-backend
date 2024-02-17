import Booking from "../schemas/Booking.js";

export const GetBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find({});
    // console.log(allBookings);
    if (allBookings.length > 0) {
      res.status(200).json({ allBookings });
    } else {
      res.status(404).json({ message: "no bookings found", status: "error" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};
