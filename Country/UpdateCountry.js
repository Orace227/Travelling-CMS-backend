import Country from "../schemas/Country.js";

export const UpdateCountry = async (req, res) => {
  try {
    const { countryId, countryName, continent } = req.body;
    // console.log({ countryId, countryName, reqBody: req.body });
    const UpdatedCountry = await Country.updateOne(
      { countryId },
      { countryName, continent }
    );
    if (UpdatedCountry) {
      // console.log(UpdatedCountry);
      res.status(200).json({ UpdatedCountry });
    } else {
      res.status(200).json({ error: "Invalid country" });
    }
  } catch (err) {
    res.status(404).json("country not found");
    console.log({ error: err });
  }
};
