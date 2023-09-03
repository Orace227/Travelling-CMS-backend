import FamilyMembers from "../schemas/FamilyMembers.js";
import Client from "../schemas/Client.js";

export const DeleteFamilyMember = async (req, res) => {
  try {
    const { clientId, FamilyMemberId } = await req.body;
    if (clientId) {
      const deleteFamilyMember = await FamilyMembers.findOne({
        clientId,
        FamilyMemberId,
      });
      if (deleteFamilyMember) {
        const deletedFamilyMember = await FamilyMembers.deleteOne({
          FamilyMemberId,
        });
        const totalFamilyMembers = await Client.updateOne(
          {
            clientId,
          },
          { $inc: { familyMembers: -1 } }
        );
        if (deletedFamilyMember) {
          // console.log(deletedFamilyMember);
          res.json({
            message: `family Member was deleted which has client id : ${clientId} !!`,
            deletedFamilyMember,
          });
        }
      } else {
        res
          .status(404)
          .json(`Client or family member with id ${clientId} is not found`);
      }
    } else {
      res.status(500).json(`we cannot get a Client for this id:${clientId} `);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
