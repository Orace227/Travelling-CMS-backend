import FamilyMembers from "../schemas/FamilyMembers.js";
import Client from "../schemas/Client.js";

export const CreateFamilyMembers = async (req, res) => {
  try {
    let allFamilyMembers = [];
    const { FamilyMembersArr } = await req.body;

    for (let i = 0; i < FamilyMembersArr.length; i++) {
      const existingFamilyMember = await FamilyMembers.findOne({
        FamilyMemberId: FamilyMembersArr[i].FamilyMemberId,
        clientId: FamilyMembersArr[i].clientId,
      });
      // console.log(existingFamilyMember);
      if (!existingFamilyMember) {
        const createdFamilyMember = await FamilyMembers.create(
          FamilyMembersArr[i]
        );
        const totalFamilyMembers = await Client.updateOne(
          {
            clientId: FamilyMembersArr[i].clientId,
          },
          { $inc: { familyMembers: 1 } }
        );
        // console.log(totalFamilyMembers);
        if (createdFamilyMember) {
          //   console.log(createdFamilyMember);
          allFamilyMembers.push(createdFamilyMember);
        }
      } else {
        res.json({
          message: "FamilyMembers was already exist!!",
        });
      }
    }
    if (allFamilyMembers.length > 0) {
      res.json({
        message: "Family Members was created!",
        allFamilyMembers,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
