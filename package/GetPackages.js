import Package from "../schemas/Package.js";

export const GetPackages = async (req, res) => {
  try {
    let {
      packageType,
      country,
      continent,
      PackageId,
      isLive,
      isShown,
      deepLink,
    } = await req.query;
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

    if (PackageId) {
      query.PackageId = PackageId;
    }
    if (deepLink) {
      query.PackageId = PackageId;
    }
    if (isLive) {
      query.isLive = isLive;
    }
    if (isShown) {
      query.isShown = isShown;
    }

    const allPackages = await Package.find(query);
    res.status(200).json({ allPackages });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
