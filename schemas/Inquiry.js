import mongoose from "mongoose";

const travelInquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hotelPreference: {
    type: String,
    default: null,
  },
  likelyTravelDate: {
    type: Date,
    required: true,
  },
  numberOfAdults: {
    type: Number,
    required: true,
  },
  numberOfChildren: {
    type: Number,
    default: 0,
  },
  numberOfInfants: {
    type: Number,
    default: 0,
  },
  budget: {
    type: Number,
    default: 0,
  },
  message: {
    type: String,
  },
});

const TravelInquiry = mongoose.model("TravelInquiry", travelInquirySchema);

export default TravelInquiry;
