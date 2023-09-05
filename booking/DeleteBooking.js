import Booking from "../schemas/Booking.js";
import Client from "../schemas/Client.js";

export const DeleteBooking = async (req, res) => {
  try {
    const { clientId, bookingId } = await req.body;
    if (clientId) {
      const deleteBooking = await Booking.findOne({
        bookingId,
        clientId,
      });
      if (deleteBooking) {
        const deletedBooking = await Booking.deleteOne({
          bookingId,
        });
        const totalBooking = await Client.updateOne(
          {
            clientId,
          },
          { $inc: { totalBookings: -1 } }
        );
        if (deletedBooking) {
          // console.log(deletedBooking);
          res.json({
            message: `booking was deleted which has client id : ${clientId} !!`,
            deletedBooking,
          });
        }
      } else {
        res
          .status(404)
          .json(`Client or family member with id ${clientId} is not found`);
      }
    } else {
      res.status(500).json(`we cannot get a Client for this id:${clientId} `);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
