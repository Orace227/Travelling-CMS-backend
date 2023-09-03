import FamilyMembers from "../schemas/FamilyMembers.js";

export const UpdateFamilyMember = async (req, res) => {
  try {
    const FamilyMembersObj = await req.body;

    if (FamilyMembersObj) {
      const updateFamilyMember = await FamilyMembers.findOne({
        clientId: FamilyMembersObj.clientId,
        FamilyMemberId: FamilyMembersObj.FamilyMemberId,
      });
      if (updateFamilyMember) {
        const updatedFamilyMember = await FamilyMembers.updateOne(
          { FamilyMemberId: FamilyMembersObj.FamilyMemberId },
          FamilyMembersObj
        );
        if (updatedFamilyMember) {
          // console.log(updatedFamilyMembers);
          res.json({
            message: `FamilyMember was updated !!`,
            "data":updatedFamilyMember,
          });
        }
      } else {
        res.status(404).json(`FamilyMember is not found`);
      }
    } else {
      res.status(500).json(`please add the FamilyMember in body`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
