import Country from "../schemas/Country.js";

export const DeleteCountry = async (req, res) => {
  try {
    const { countryId } = req.body;
    const UpdatedCountry = await Country.deleteOne({ countryId });
    if (UpdatedCountry) {
      res.status(200).json("country is deleted successfully!!");
    } else {
      res.status(403).json({ error: " country is not deleted successfully!" });
    }
  } catch (err) {
    res.status(404).json("country not found");
    console.log({ error: err });
  }
};
