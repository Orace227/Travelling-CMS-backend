import Country from "../schemas/Country.js";

export const CreateCountry = async (req, res) => {
  try {
    const { countryName, countryId, continent } = req.body;
    console.log(countryName);
    const CreateCountry = await Country.create({
      countryId,
      countryName,
      continent,
    });
    if (CreateCountry) {
      res.status(200).json({ countryId, countryName, continent });
    } else {
      res.status(200).json({ error: "Invalid country" });
    }
  } catch (err) {
    res.status(500).json("country was not created");
    console.log({ error: err });
  }
};
