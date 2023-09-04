import Package from "../schemas/Package.js";

export const GetPackages = async (req, res) => {
  try {
    const { packageType, country, continent } = await req.query;
    const query = {};

    if (packageType) {
      query.packageType = packageType;
    }

    if (country) {
      query.country = country;
    }

    if (continent) {
      query.continent = continent;
    }

    const allPackages = await Package.find(query, "-packagePrice");
    res.status(200).json({ allPackages });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
