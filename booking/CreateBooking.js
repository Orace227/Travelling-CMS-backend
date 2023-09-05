import Booking from "../schemas/Booking.js";
import Client from "../schemas/Client.js";

export const CreateBooking = async (req, res) => {
  try {
    const bookingObj = await req.body;
    const existingBooking = await Booking.findOne({
      bookingId: bookingObj.bookingId,
    });
    if (!existingBooking) {
      const createdBooking = await Booking.create(bookingObj);
      const totalBookings = await Client.updateOne(
        {
          clientId: bookingObj.clientId,
        },
        { $inc: { totalBookings: 1 } }
      );
      if (createdBooking) {
        // console.log(createdBooking);
        res.json({
          message: "Booking was Successful!",
          Booking: createdBooking,
        });
      }
    } else {
      res.json({
        message: "Booking was already booked!!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
