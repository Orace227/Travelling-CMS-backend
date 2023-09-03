import Package from "../schemas/Package.js";

export const GetDraftPackage = async (req, res) => {
  try {
    const allPackages = await Package.find({ isLive: false });
    res.status(200).json({ allPackages });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
