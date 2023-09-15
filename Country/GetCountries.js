import Country from "../schemas/Country.js";

export const GetCountries = async (req, res) => {
  try {
    const allCountries = await Country.find({});
    if (allCountries) {
      res.status(200).json({ allCountries });
    } else {
      res.status(200).json({ error: "Invalid country" });
    }
  } catch (err) {
    res.status(404).json("country not found");
    console.log({ error: err });
  }
};
