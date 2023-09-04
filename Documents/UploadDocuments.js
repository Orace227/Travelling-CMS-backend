import Document from "../schemas/Documents.js";
import FamilyMember from "../schemas/FamilyMembers.js";

export const UploadDocuments = async (req, res) => {
  try {
    const { allDocumentsArr } = await req.body;
    let allDocuments = [];
    for (let i = 0; i < allDocumentsArr.length; i++) {
      const existingDocuments = await Document.findOne({
        FamilyMemberId: allDocumentsArr[i].familyMemberId,
        clientId: allDocumentsArr[i].clientId,
      });
      if (!existingDocuments) {
        const createdDocument = await Document.create(allDocumentsArr[i]);
        if (createdDocument) {
          allDocuments.push(createdDocument);
          const totalFamilyMembers = await FamilyMember.updateOne(
            {
              FamilyMemberId: allDocumentsArr[i].familyMemberId,
            },
            { $inc: { DocumentNumber: 1 } }
          );
        }
      } else {
        res.json({
          message: `Document was already exist which has family Member id:${allDocumentsArr[i].familyMemberId}!!`,
        });
      }
    }
    if (allDocuments.length > 0) {
      res.json({
        message: "Documents were Uploaded!!",
        allDocuments,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
