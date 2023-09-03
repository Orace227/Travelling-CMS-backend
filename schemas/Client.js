import mongoose from "mongoose";

// TODO: i have make some feilds unique 
const clientSchema = new mongoose.Schema({
  clientId: {
    type: Number,
    unique: true,
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
  },
  phone: {
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
  passportNumber: {
    type: String,
    required: true,
  },
  foodPreferences: {
    type: String,
  },
  frequentFlyerNumber: {
    type: String,
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
