import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
  countryId: {
    type: Number,
    unique: true,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  countryImgName: {
    type: String,
    required: true,
  },
  countryImgPath: {
    type: String,
    required: true,
  },
});

const Country = mongoose.model("Country", CountrySchema);

export default Country;
