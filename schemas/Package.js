import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

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
  packageImg: String,
  packageBody: packageBodySchema,
});

const Package = mongoose.model("Package", packageSchema);

export default Package;
