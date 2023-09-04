import Document from "../schemas/Documents.js";
import FamilyMember from "../schemas/FamilyMembers.js";

export const deleteDocument = async (req, res) => {
  try {
    const { clientId, familyMemberId, documentId } = await req.body;
    if (clientId && familyMemberId) {
      const deleteDocument = await Document.findOne({
        documentId,
      });
      if (deleteDocument) {
        const deletedDocument = await Document.deleteOne({
          documentId,
        });
        const totalDocument = await FamilyMember.updateOne(
          {
            FamilyMemberId:familyMemberId,
          },
          { $inc: { DocumentNumber: -1 } }
        );
        if (deletedDocument) {
          res.json({
            message: `document was deleted which has family member id : ${familyMemberId} !!`,
            deletedDocument,
          });
        }
      } else {
        res.status(404).json(`document with id ${documentId} is not found`);
      }
    } else {
      res.status(500).json(`we cannot get a Client for this id:${clientId} `);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
