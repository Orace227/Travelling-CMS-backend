import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: Number,
    unique: true,
    required: true,
  },
  inquiryId: {
    type: Number,
    unique: true,
    required: true,
  },
  packageId: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value.toString().length === 6 && Number.isInteger(value);
      },
      message: "PackageId must be a 6-digit number.",
    },
  },
  clientId: {
    type: Number,
    required: true,
  },
  hotelDetails: {
    type: Object,
    required: false,
  },
  flightDetails: {
    type: Object,
    required: false,
  },
  receiptDetails: {
    type: Object,
    required: false,
  },
  modifiedPackagePrice: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
