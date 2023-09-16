import mongoose from "mongoose";

const bookingDetailsSchema = new mongoose.Schema({
  bookingType: {
    type: String,
    required: true,
  },
  bookingName: {
    type: String,
    required: true,
  },
  docImgName: {
    type: String,
    required: true,
  },
  docImgPath: {
    type: String,
    required: true,
  },
});

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: Number,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        return value.toString().length === 6 && Number.isInteger(value);
      },
      message: "PackageId must be a 6-digit number.",
    },
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
    validate: {
      validator: function (value) {
        return value.toString().length === 6 && Number.isInteger(value);
      },
      message: "ClientId must be a 6-digit number.",
    },
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  modifiedPackagePrice: {
    type: Number,
    required: true,
  },
  bookingDetails: [bookingDetailsSchema],
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
