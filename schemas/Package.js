import mongoose from "mongoose";

// Schema for tour details (day-wise)
const tourDetailsSchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
});

// Schema for inclusions and exclusions
const inclusionsExclusionsSchema = new mongoose.Schema({
  inclusions: [String],
  exclusions: [String],
});

// Schema for terms and conditions
const termsConditionsSchema = new mongoose.Schema({
  terms: [String],
  conditions: [String],
});

// Schema for the entire package body
const packageBodySchema = new mongoose.Schema({
  tourDetails: [tourDetailsSchema],
  inclusionsAndExclusions: inclusionsExclusionsSchema,
  termsAndConditions: termsConditionsSchema,
});

// Main package schema
const packageSchema = new mongoose.Schema({
  PackageId: {
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
  packageName: String,
  isLive: {
    type: Boolean,
    default: false,
  },
  packagePrice: {
    type: Number,
    default: 0,
  },
  packageType: {
    type: String,
    enum: [
      "destination",
      "Wellness Resorts",
      "Wildlife Drives",
      "Sustainable paths",
      "Cruise Vacations",
    ],
    required: true,
  },
  packageImgPath: String,
  country: String,
  continent: String,
  packageBody: packageBodySchema,
});

const Package = mongoose.model("Package", packageSchema);

export default Package;
