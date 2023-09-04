import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  documentId: {
    type: Number,
    required: true,
    unique: true,
  },
  familyMemberId: {
    type: Number,
    required: true,
  },
  clientId: {
    type: Number,
    required: true,
  },
  DocumentName: {
    type: String,
    required: true,
  },
  DocumentType: {
    type: String,
    required: true,
  },
  Data: {
    type: Buffer,
    required: true,
  },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
