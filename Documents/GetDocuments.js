import Document from "../schemas/Documents.js";

export const GetDocuments = async (req, res) => {
  try {
    const {clientId,familyMemberId} = await req.query;
    const allDocuments = await Document.find({clientId, familyMemberId });
    if (allDocuments.length > 0) {
      res.status(200).json({
        message: `All Documents are  fetched for family member id: ${familyMemberId}`,
        allDocuments,
      });
    } else {
      res.status(404).json({
        message: `No Documents were found for family member id: ${familyMemberId}!!`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
