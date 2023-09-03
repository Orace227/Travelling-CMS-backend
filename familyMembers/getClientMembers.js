import FamilyMembers from "../schemas/FamilyMembers.js";

export const GetFamilyMembers = async (req, res) => {
  try {
    const clientId = req.params.id;
    const allFamilyMembers = await FamilyMembers.find({ clientId });
    if (allFamilyMembers.length > 0) {
      res.status(200).json({
        message: `All family members are fetched for client id: ${clientId}`,
        allFamilyMembers,
      });
    } else {
      res
        .status(404)
        .json({
          message: `No family members were found for id: ${clientId}!!`,
        });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
