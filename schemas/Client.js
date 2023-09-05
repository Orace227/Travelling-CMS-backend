import mongoose from "mongoose";

// Define a subdocument schema for frequent flyer and hotel loyalty numbers
const loyaltySchema = new mongoose.Schema({
  type: String, // e.g., "Frequent Flyer" or "Hotel Loyalty"
  number: String,
});


const clientSchema = new mongoose.Schema({
  clientId: {
    type: Number,
    unique: true,
    required: true,
  },
  familyMembers: {
    type: Number,
    default: 0,
  },
  totalBookings: {
    type: Number,
    default: 0,
  },
  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true, // Make email unique
  },
  mobile: {
    type: String,
    required: true,
    // unique: true, // Make mobile number unique
  },
  dateOfBirth: Date,
  passportNumber: {
    type: String,
    required: true,
    // unique: true
  },
  passportExpiryDate: Date, // Add passport expiry date field
  frequentFlyerNumbers: [loyaltySchema], // Array of frequent flyer numbers
  hotelLoyaltyNumbers: [loyaltySchema], // Array of hotel loyalty numbers
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  foodPreferences: String,
  companyName: String,
  companyGSTNumber: String,
  companyGSTEmail: String,
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
