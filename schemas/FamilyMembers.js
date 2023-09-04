import mongoose from "mongoose";

// TODO: i have make some feilds unique

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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  relationship: {
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
  frequentFlyerNumber: {
    type: String,
  },
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

export default FamilyMember;
