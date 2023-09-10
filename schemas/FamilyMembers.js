import mongoose from "mongoose";

// TODO: i have make some feilds unique
const loyaltySchema = new mongoose.Schema({
  type: String, // e.g., "Frequent Flyer" or "Hotel Loyalty"
  number: String,
});

const familyMemberSchema = new mongoose.Schema({
  FamilyMemberId: {
    type: Number,
    required: true,
  },
  clientId: {
    type: Number,
    required: true,
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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  passportExpiryDate: {
    type: Date,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
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
  DocumentNumber: {
    type: Number,
    default: 0,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  foodPreferences: {
    type: String,
  },
  frequentFlyerNumbers: [loyaltySchema], // Array of frequent flyer numbers
  hotelLoyaltyNumbers: [loyaltySchema], // Array of hotel loyalty numbers
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

export default FamilyMember;
